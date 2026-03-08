
-- Fix 1: Users can only insert subscriptions with 'pending' status
DROP POLICY IF EXISTS "Users can insert own subscriptions" ON public.subscriptions;
CREATE POLICY "Users can insert own subscriptions" ON public.subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id AND status = 'pending');

-- Fix 2: Remove user UPDATE on login_verifications (server-side only)
DROP POLICY IF EXISTS "Users can update own verifications" ON public.login_verifications;

-- Fix 3: Restrict discount codes to authenticated users only
DROP POLICY IF EXISTS "Authenticated users can view active discount codes" ON public.discount_codes;
CREATE POLICY "Authenticated users can view active discount codes" ON public.discount_codes FOR SELECT TO authenticated USING (is_active = true);

-- Fix 4: Restrict referral tracking insert with code validation
DROP POLICY IF EXISTS "Referred users can insert own tracking" ON public.referral_tracking;
CREATE POLICY "Referred users can insert own tracking" ON public.referral_tracking FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = referred_user_id
  AND EXISTS (
    SELECT 1 FROM public.referral_codes rc
    WHERE rc.code = referral_code AND rc.user_id = referrer_user_id
  )
);
