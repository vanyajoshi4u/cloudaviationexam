
-- Fix: Change all RESTRICTIVE policies to PERMISSIVE (except rate_limits deny-all)
-- We must drop and recreate each policy since ALTER POLICY cannot change permissive/restrictive type

-- ============ profiles ============
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

-- ============ subscriptions ============
DROP POLICY IF EXISTS "Users can view own subscriptions" ON public.subscriptions;
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own subscriptions" ON public.subscriptions;
CREATE POLICY "Users can insert own subscriptions" ON public.subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all subscriptions" ON public.subscriptions;
CREATE POLICY "Admins can view all subscriptions" ON public.subscriptions FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can update subscriptions" ON public.subscriptions;
CREATE POLICY "Admins can update subscriptions" ON public.subscriptions FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

-- ============ active_sessions ============
DROP POLICY IF EXISTS "Users can view own sessions" ON public.active_sessions;
CREATE POLICY "Users can view own sessions" ON public.active_sessions FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own sessions" ON public.active_sessions;
CREATE POLICY "Users can insert own sessions" ON public.active_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own sessions" ON public.active_sessions;
CREATE POLICY "Users can update own sessions" ON public.active_sessions FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own sessions" ON public.active_sessions;
CREATE POLICY "Users can delete own sessions" ON public.active_sessions FOR DELETE USING (auth.uid() = user_id);

-- ============ device_fingerprints ============
DROP POLICY IF EXISTS "Users can view own fingerprints" ON public.device_fingerprints;
CREATE POLICY "Users can view own fingerprints" ON public.device_fingerprints FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own fingerprints" ON public.device_fingerprints;
CREATE POLICY "Users can insert own fingerprints" ON public.device_fingerprints FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own fingerprints" ON public.device_fingerprints;
CREATE POLICY "Users can update own fingerprints" ON public.device_fingerprints FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own fingerprints" ON public.device_fingerprints;
CREATE POLICY "Users can delete own fingerprints" ON public.device_fingerprints FOR DELETE USING (auth.uid() = user_id);

-- ============ login_verifications ============
DROP POLICY IF EXISTS "Users can view own verifications" ON public.login_verifications;
CREATE POLICY "Users can view own verifications" ON public.login_verifications FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own verifications" ON public.login_verifications;
CREATE POLICY "Users can insert own verifications" ON public.login_verifications FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own verifications" ON public.login_verifications;
CREATE POLICY "Users can update own verifications" ON public.login_verifications FOR UPDATE USING (auth.uid() = user_id);

-- ============ user_roles ============
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

-- ============ audit_logs ============
DROP POLICY IF EXISTS "Admins can view all audit logs" ON public.audit_logs;
CREATE POLICY "Admins can view all audit logs" ON public.audit_logs FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Users can view own audit logs" ON public.audit_logs;
CREATE POLICY "Users can view own audit logs" ON public.audit_logs FOR SELECT USING (auth.uid() = user_id);

-- ============ discount_codes ============
DROP POLICY IF EXISTS "Authenticated users can view active discount codes" ON public.discount_codes;
CREATE POLICY "Authenticated users can view active discount codes" ON public.discount_codes FOR SELECT USING (is_active = true);

-- ============ discount_usage ============
DROP POLICY IF EXISTS "Users can view own discount usage" ON public.discount_usage;
CREATE POLICY "Users can view own discount usage" ON public.discount_usage FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own discount usage" ON public.discount_usage;
CREATE POLICY "Users can insert own discount usage" ON public.discount_usage FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============ referral_codes ============
DROP POLICY IF EXISTS "Users can view own referral code" ON public.referral_codes;
CREATE POLICY "Users can view own referral code" ON public.referral_codes FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own referral code" ON public.referral_codes;
CREATE POLICY "Users can insert own referral code" ON public.referral_codes FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============ referral_tracking ============
DROP POLICY IF EXISTS "Referrers can view own referrals" ON public.referral_tracking;
CREATE POLICY "Referrers can view own referrals" ON public.referral_tracking FOR SELECT USING (auth.uid() = referrer_user_id);

DROP POLICY IF EXISTS "Referred users can insert own tracking" ON public.referral_tracking;
CREATE POLICY "Referred users can insert own tracking" ON public.referral_tracking FOR INSERT WITH CHECK (auth.uid() = referred_user_id);

DROP POLICY IF EXISTS "Admins can view all referrals" ON public.referral_tracking;
CREATE POLICY "Admins can view all referrals" ON public.referral_tracking FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can update referrals" ON public.referral_tracking;
CREATE POLICY "Admins can update referrals" ON public.referral_tracking FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

-- ============ Fix has_role function access ============
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;

-- Also restrict other security definer functions
REVOKE EXECUTE ON FUNCTION public.has_active_subscription(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_active_subscription(uuid) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.check_device_allowed(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.check_device_allowed(uuid, text) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.has_active_session(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_active_session(uuid) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.cleanup_stale_sessions() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.cleanup_stale_sessions() TO service_role;

REVOKE EXECUTE ON FUNCTION public.cleanup_rate_limits() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.cleanup_rate_limits() TO service_role;
