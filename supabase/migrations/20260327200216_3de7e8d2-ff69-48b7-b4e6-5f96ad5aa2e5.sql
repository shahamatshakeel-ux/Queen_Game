
DROP VIEW IF EXISTS public.leaderboard;

CREATE OR REPLACE VIEW public.leaderboard WITH (security_invoker = true) AS
SELECT 
  p.display_name,
  p.avatar_url,
  COUNT(g.id) AS total_games,
  MAX(g.score) AS best_score,
  MIN(g.time_ms) FILTER (WHERE g.completed = true) AS best_time_ms,
  COUNT(g.id) FILTER (WHERE g.completed = true) AS wins,
  ROUND(
    COUNT(g.id) FILTER (WHERE g.completed = true)::numeric / NULLIF(COUNT(g.id), 0) * 100
  ) AS win_rate,
  g.user_id
FROM public.game_history g
JOIN public.profiles p ON p.user_id = g.user_id
GROUP BY g.user_id, p.display_name, p.avatar_url
ORDER BY best_score DESC;

-- Allow anyone to read game_history for leaderboard
CREATE POLICY "Anyone can view game history for leaderboard" ON public.game_history FOR SELECT USING (true);
-- Drop the restrictive one
DROP POLICY IF EXISTS "Users can view their own game history" ON public.game_history;
