CREATE OR REPLACE FUNCTION public.increment_login_count(_user_id uuid)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  UPDATE public.profiles
  SET login_count = login_count + 1
  WHERE user_id = _user_id;
$$;