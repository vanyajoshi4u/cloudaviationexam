-- Enforce strict one-device policy by keeping only the latest fingerprint per user
WITH ranked AS (
  SELECT
    id,
    ROW_NUMBER() OVER (
      PARTITION BY user_id
      ORDER BY last_seen_at DESC, first_seen_at DESC, id DESC
    ) AS rn
  FROM public.device_fingerprints
)
DELETE FROM public.device_fingerprints d
USING ranked r
WHERE d.id = r.id
  AND r.rn > 1;

-- Ensure only one trusted fingerprint can exist per user
CREATE UNIQUE INDEX IF NOT EXISTS idx_device_fingerprints_user_unique
ON public.device_fingerprints (user_id);

-- Strict device check: allow only the existing trusted device,
-- or first-time registration when no trusted device exists yet.
CREATE OR REPLACE FUNCTION public.check_device_allowed(_user_id uuid, _fingerprint text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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
        OR NOT EXISTS (
          SELECT 1
          FROM public.device_fingerprints
          WHERE user_id = _user_id
        )
    END
$function$;