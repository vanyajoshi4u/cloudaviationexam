-- Drop the restrictive insert policy
DROP POLICY IF EXISTS "Users can insert own subscriptions" ON public.subscriptions;

-- Recreate as PERMISSIVE (default)
CREATE POLICY "Users can insert own subscriptions"
ON public.subscriptions
FOR INSERT
TO authenticated
WITH CHECK ((auth.uid() = user_id) AND (status = 'pending'::subscription_status));