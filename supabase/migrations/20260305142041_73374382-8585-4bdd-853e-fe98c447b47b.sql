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
        OR (SELECT COUNT(*) FROM public.device_fingerprints WHERE user_id = _user_id) < 2
    END
$function$;

-- Drop the unique-per-user index so 2 devices can exist
DROP INDEX IF EXISTS idx_device_fingerprints_user_unique;