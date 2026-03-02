
-- Table to store each user's unique referral code
CREATE TABLE public.referral_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  code text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.referral_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own referral code"
  ON public.referral_codes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own referral code"
  ON public.referral_codes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Table to track referrals: who referred whom, and whether they purchased
CREATE TABLE public.referral_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_user_id uuid NOT NULL,
  referred_user_id uuid NOT NULL UNIQUE,
  referral_code text NOT NULL,
  signed_up_at timestamptz NOT NULL DEFAULT now(),
  purchased boolean NOT NULL DEFAULT false,
  purchased_at timestamptz,
  reward_claimed boolean NOT NULL DEFAULT false
);

ALTER TABLE public.referral_tracking ENABLE ROW LEVEL SECURITY;

-- Referrers can see their own referrals
CREATE POLICY "Referrers can view own referrals"
  ON public.referral_tracking FOR SELECT
  USING (auth.uid() = referrer_user_id);

-- System inserts via trigger/edge function, but allow referred user to insert their own record
CREATE POLICY "Referred users can insert own tracking"
  ON public.referral_tracking FOR INSERT
  WITH CHECK (auth.uid() = referred_user_id);

-- Admins can view all referrals
CREATE POLICY "Admins can view all referrals"
  ON public.referral_tracking FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update referral tracking (for reward management)
CREATE POLICY "Admins can update referrals"
  ON public.referral_tracking FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Function to auto-generate referral code for new subscribers
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS text
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
DECLARE
  new_code text;
  code_exists boolean;
BEGIN
  LOOP
    new_code := 'CA-' || upper(substr(md5(random()::text), 1, 6));
    SELECT EXISTS(SELECT 1 FROM public.referral_codes WHERE code = new_code) INTO code_exists;
    EXIT WHEN NOT code_exists;
  END LOOP;
  RETURN new_code;
END;
$$;

-- Function to mark referral as purchased when subscription is created
CREATE OR REPLACE FUNCTION public.mark_referral_purchased()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  UPDATE public.referral_tracking
  SET purchased = true, purchased_at = now()
  WHERE referred_user_id = NEW.user_id AND purchased = false;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_mark_referral_purchased
  AFTER INSERT ON public.subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.mark_referral_purchased();
