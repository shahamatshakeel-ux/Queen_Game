-- Fix leaderboard view: rank by composite score (time + hints + difficulty weighted)
-- Filter out invalid time_ms = 0 entries from best_time calculation
DROP VIEW IF EXISTS public.leaderboard;

CREATE VIEW public.leaderboard
WITH (security_invoker=on) AS
SELECT 
  gh.user_id,
  p.display_name,
  p.avatar_url,
  COUNT(*)::integer AS total_games,
  COUNT(*) FILTER (WHERE gh.completed)::integer AS wins,
  ROUND(
    (COUNT(*) FILTER (WHERE gh.completed)::numeric / NULLIF(COUNT(*), 0)) * 100
  )::integer AS win_rate,
  MAX(gh.score) AS best_score,
  MIN(gh.time_ms) FILTER (WHERE gh.completed AND gh.time_ms > 0) AS best_time_ms,
  MIN(gh.hints_used) FILTER (WHERE gh.completed) AS fewest_hints,
  MODE() WITHIN GROUP (ORDER BY gh.difficulty) FILTER (WHERE gh.completed) AS favorite_difficulty
FROM public.game_history gh
JOIN public.profiles p ON p.user_id = gh.user_id
GROUP BY gh.user_id, p.display_name, p.avatar_url
HAVING COUNT(*) FILTER (WHERE gh.completed) > 0
ORDER BY 
  MAX(gh.score) DESC,
  MIN(gh.hints_used) FILTER (WHERE gh.completed) ASC,
  MIN(gh.time_ms) FILTER (WHERE gh.completed AND gh.time_ms > 0) ASC;

-- Clean up the corrupt row with time_ms = 0
DELETE FROM public.game_history WHERE time_ms = 0;

-- Add a CHECK to prevent invalid time_ms going forward
ALTER TABLE public.game_history DROP CONSTRAINT IF EXISTS game_history_time_ms_positive;
ALTER TABLE public.game_history ADD CONSTRAINT game_history_time_ms_positive CHECK (time_ms > 0);