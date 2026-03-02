
-- Table to track unique device fingerprints per user (max 3 trusted)
CREATE TABLE public.device_fingerprints (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  fingerprint TEXT NOT NULL,
  device_label TEXT, -- e.g. "Chrome on macOS"
  first_seen_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_seen_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, fingerprint)
);

-- Enable RLS
ALTER TABLE public.device_fingerprints ENABLE ROW LEVEL SECURITY;

-- Users can view their own fingerprints
CREATE POLICY "Users can view own fingerprints"
ON public.device_fingerprints
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own fingerprints
CREATE POLICY "Users can insert own fingerprints"
ON public.device_fingerprints
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own fingerprints
CREATE POLICY "Users can update own fingerprints"
ON public.device_fingerprints
FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own fingerprints
CREATE POLICY "Users can delete own fingerprints"
ON public.device_fingerprints
FOR DELETE
USING (auth.uid() = user_id);

-- Function to check if a device is trusted or if user has room for new devices
CREATE OR REPLACE FUNCTION public.check_device_allowed(_user_id UUID, _fingerprint TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    -- Allow if this fingerprint already exists for the user
    EXISTS (
      SELECT 1 FROM public.device_fingerprints
      WHERE user_id = _user_id AND fingerprint = _fingerprint
    )
    OR
    -- Allow if user has fewer than 3 devices registered
    (SELECT COUNT(*) FROM public.device_fingerprints WHERE user_id = _user_id) < 3
$$;
