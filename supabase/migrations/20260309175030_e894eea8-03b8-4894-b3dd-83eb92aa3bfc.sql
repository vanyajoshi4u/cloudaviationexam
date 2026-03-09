ALTER TABLE public.profiles ADD COLUMN login_count integer NOT NULL DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN review_submitted boolean NOT NULL DEFAULT false;