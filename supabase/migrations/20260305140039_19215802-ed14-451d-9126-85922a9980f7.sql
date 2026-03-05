ALTER TABLE public.login_verifications 
ADD COLUMN IF NOT EXISTS fingerprint text,
ADD COLUMN IF NOT EXISTS device_label text;