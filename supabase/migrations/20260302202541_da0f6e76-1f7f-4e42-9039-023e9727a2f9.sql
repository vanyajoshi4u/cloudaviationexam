
-- Add column to store screenshot image hash for duplicate detection
ALTER TABLE public.subscriptions ADD COLUMN screenshot_hash TEXT;

-- Add unique constraint to prevent same screenshot being used twice
CREATE UNIQUE INDEX idx_subscriptions_screenshot_hash ON public.subscriptions (screenshot_hash) WHERE screenshot_hash IS NOT NULL;
