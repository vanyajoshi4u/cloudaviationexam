CREATE OR REPLACE FUNCTION public.auto_approve_subscription()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  NEW.status := 'approved';
  NEW.approved_at := now();
  
  IF NEW.plan = '3_months' THEN
    NEW.expires_at := now() + interval '3 months';
    -- Replace existing 6_months and live_atc_3_months plans
    UPDATE public.subscriptions
    SET status = 'rejected', updated_at = now()
    WHERE user_id = NEW.user_id
      AND status = 'approved'
      AND plan IN ('6_months', 'live_atc_3_months')
      AND expires_at > now();
  ELSIF NEW.plan = '6_months' THEN
    NEW.expires_at := now() + interval '6 months';
  ELSIF NEW.plan = '12_months' THEN
    NEW.expires_at := now() + interval '12 months';
  ELSIF NEW.plan = 'live_atc_3_months' THEN
    NEW.expires_at := now() + interval '3 months';
  END IF;
  
  RETURN NEW;
END;
$function$;