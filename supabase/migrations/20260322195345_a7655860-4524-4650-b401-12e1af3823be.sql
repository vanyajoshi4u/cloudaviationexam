
-- Change default max_devices from 3 to 2 for new users
ALTER TABLE public.profiles ALTER COLUMN max_devices SET DEFAULT 2;

-- Update all existing users to max_devices = 2, except rahulbajwa733@gmail.com
UPDATE public.profiles SET max_devices = 2 WHERE email != 'rahulbajwa733@gmail.com';
