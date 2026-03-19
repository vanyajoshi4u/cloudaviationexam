
DO $$
DECLARE
  _uid uuid := 'a87f27aa-2aa3-4bcf-996e-a2772f8f6e30';
BEGIN
  DELETE FROM public.active_sessions WHERE user_id = _uid;
  DELETE FROM public.device_fingerprints WHERE user_id = _uid;
  DELETE FROM public.login_verifications WHERE user_id = _uid;
  DELETE FROM public.bookmarked_questions WHERE user_id = _uid;
  DELETE FROM public.quiz_results WHERE user_id = _uid;
  DELETE FROM public.profiles WHERE user_id = _uid;
  DELETE FROM public.subscriptions WHERE user_id = _uid;
  DELETE FROM public.referral_codes WHERE user_id = _uid;
  DELETE FROM public.referral_tracking WHERE referrer_user_id = _uid OR referred_user_id = _uid;
  DELETE FROM public.discount_usage WHERE user_id = _uid;
  DELETE FROM public.user_roles WHERE user_id = _uid;
  DELETE FROM public.audit_logs WHERE user_id = _uid;
  DELETE FROM auth.users WHERE id = _uid;
END $$;
