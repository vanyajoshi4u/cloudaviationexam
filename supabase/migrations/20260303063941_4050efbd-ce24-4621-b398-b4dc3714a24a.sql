-- rate_limits table: deny all direct access (only accessed via SECURITY DEFINER functions)
-- Add explicit deny-all policy so it's clear this table is not user-accessible
CREATE POLICY "No direct access to rate_limits"
ON public.rate_limits
FOR ALL
TO authenticated, anon
USING (false)
WITH CHECK (false);
