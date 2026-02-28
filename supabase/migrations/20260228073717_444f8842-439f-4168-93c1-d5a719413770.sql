
-- Table to track active sessions (single device enforcement)
CREATE TABLE public.active_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_active_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.active_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sessions" ON public.active_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions" ON public.active_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own sessions" ON public.active_sessions
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions" ON public.active_sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- Allow service role to manage sessions (for edge functions)
CREATE POLICY "Service role can manage sessions" ON public.active_sessions
  FOR ALL USING (true) WITH CHECK (true);

-- Table to track login verifications (magic link per login)
CREATE TABLE public.login_verifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  token UUID NOT NULL DEFAULT gen_random_uuid(),
  verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now() + interval '10 minutes'
);

ALTER TABLE public.login_verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own verifications" ON public.login_verifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own verifications" ON public.login_verifications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own verifications" ON public.login_verifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Function to clean up expired sessions (older than 24 hours of inactivity)
CREATE OR REPLACE FUNCTION public.cleanup_stale_sessions()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  DELETE FROM public.active_sessions
  WHERE last_active_at < now() - interval '24 hours';
$$;

-- Function to check if user has active session elsewhere
CREATE OR REPLACE FUNCTION public.has_active_session(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.active_sessions
    WHERE user_id = _user_id
      AND last_active_at > now() - interval '24 hours'
  );
$$;
