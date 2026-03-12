
-- Add max_devices column with default 3
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS max_devices integer NOT NULL DEFAULT 3;

-- Update check_device_allowed to use per-user limit
CREATE OR REPLACE FUNCTION public.check_device_allowed(_user_id uuid, _fingerprint text)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $$
  SELECT
    CASE
      WHEN COALESCE(length(trim(_fingerprint)), 0) = 0 THEN false
      ELSE
        EXISTS (
          SELECT 1
          FROM public.device_fingerprints
          WHERE user_id = _user_id
            AND fingerprint = _fingerprint
        )
        OR (SELECT COUNT(*) FROM public.device_fingerprints WHERE user_id = _user_id) < 
           COALESCE((SELECT max_devices FROM public.profiles WHERE user_id = _user_id), 3)
    END
$$;
