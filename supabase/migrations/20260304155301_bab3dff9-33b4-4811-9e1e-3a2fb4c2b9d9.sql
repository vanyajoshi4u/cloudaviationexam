
CREATE TABLE public.discount_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  discount_amount integer NOT NULL DEFAULT 69,
  max_uses integer NOT NULL DEFAULT 20,
  current_uses integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.discount_codes ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read active codes
CREATE POLICY "Authenticated users can view active discount codes"
ON public.discount_codes
FOR SELECT
TO authenticated
USING (is_active = true);

-- Insert the 6 discount codes
INSERT INTO public.discount_codes (code, discount_amount, max_uses) VALUES
  ('JENSON69', 69, 20),
  ('DIVYASINGH', 69, 20),
  ('SIMRAN69', 69, 20),
  ('ADI69', 69, 20),
  ('CHESHTA69', 69, 20),
  ('PULKIT69', 69, 20);

-- Track which user used which code
CREATE TABLE public.discount_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  discount_code_id uuid NOT NULL REFERENCES public.discount_codes(id),
  used_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.discount_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own discount usage"
ON public.discount_usage
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own discount usage"
ON public.discount_usage
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Function to apply discount code atomically
CREATE OR REPLACE FUNCTION public.apply_discount_code(_code text, _user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  _discount_code discount_codes%ROWTYPE;
  _already_used boolean;
BEGIN
  SELECT * INTO _discount_code FROM discount_codes WHERE code = upper(_code) AND is_active = true;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'message', 'Invalid discount code');
  END IF;

  IF _discount_code.current_uses >= _discount_code.max_uses THEN
    RETURN jsonb_build_object('success', false, 'message', 'This discount code has reached its usage limit');
  END IF;

  SELECT EXISTS(SELECT 1 FROM discount_usage WHERE user_id = _user_id AND discount_code_id = _discount_code.id) INTO _already_used;
  
  IF _already_used THEN
    RETURN jsonb_build_object('success', false, 'message', 'You have already used this discount code');
  END IF;

  UPDATE discount_codes SET current_uses = current_uses + 1 WHERE id = _discount_code.id;
  INSERT INTO discount_usage (user_id, discount_code_id) VALUES (_user_id, _discount_code.id);

  RETURN jsonb_build_object('success', true, 'discount', _discount_code.discount_amount, 'message', 'Discount applied!');
END;
$$;
