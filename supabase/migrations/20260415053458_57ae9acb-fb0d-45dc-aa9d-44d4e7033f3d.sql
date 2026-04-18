
-- Add difficulty and hints_used columns to game_history
ALTER TABLE public.game_history 
  ADD COLUMN difficulty text NOT NULL DEFAULT 'medium',
  ADD COLUMN hints_used integer NOT NULL DEFAULT 0;

-- Add constraint for difficulty values
ALTER TABLE public.game_history 
  ADD CONSTRAINT game_history_difficulty_check 
  CHECK (difficulty IN ('easy', 'medium', 'hard'));

-- Drop and recreate leaderboard view with new columns
DROP VIEW IF EXISTS public.leaderboard;

CREATE VIEW public.leaderboard AS
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
  MIN(gh.time_ms) FILTER (WHERE gh.completed) AS best_time_ms,
  MIN(gh.hints_used) FILTER (WHERE gh.completed) AS fewest_hints,
  MODE() WITHIN GROUP (ORDER BY gh.difficulty) AS favorite_difficulty
FROM public.game_history gh
JOIN public.profiles p ON p.user_id = gh.user_id
GROUP BY gh.user_id, p.display_name, p.avatar_url
ORDER BY best_score DESC;
