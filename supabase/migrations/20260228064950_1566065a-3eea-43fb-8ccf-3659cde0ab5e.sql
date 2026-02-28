
-- Auto-approve subscriptions on insert
CREATE OR REPLACE FUNCTION public.auto_approve_subscription()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.status := 'approved';
  NEW.approved_at := now();
  
  IF NEW.plan = '6_months' THEN
    NEW.expires_at := now() + interval '6 months';
  ELSIF NEW.plan = '12_months' THEN
    NEW.expires_at := now() + interval '12 months';
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_auto_approve_subscription
BEFORE INSERT ON public.subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.auto_approve_subscription();
