
-- Remove the overly permissive policy (service role bypasses RLS anyway)
DROP POLICY "Service role can manage sessions" ON public.active_sessions;
