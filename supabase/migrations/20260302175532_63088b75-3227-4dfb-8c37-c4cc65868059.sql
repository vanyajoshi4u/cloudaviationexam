
-- Add 3_months to subscription_plan enum
ALTER TYPE public.subscription_plan ADD VALUE IF NOT EXISTS '3_months';

-- Update the auto_approve_subscription function to handle 3_months
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
  ELSIF NEW.plan = '6_months' THEN
    NEW.expires_at := now() + interval '6 months';
  ELSIF NEW.plan = '12_months' THEN
    NEW.expires_at := now() + interval '12 months';
  END IF;
  
  RETURN NEW;
END;
$function$;
