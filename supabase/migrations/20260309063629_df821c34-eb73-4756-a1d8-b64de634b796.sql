-- Fix subscription INSERT RLS to be compatible with BEFORE INSERT auto-approval trigger
-- The trigger sets NEW.status = 'approved' before insert, so status='pending' in WITH CHECK causes RLS failures.

DROP POLICY IF EXISTS "Users can insert own subscriptions" ON public.subscriptions;

CREATE POLICY "Users can insert own subscriptions"
ON public.subscriptions
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);