
-- 1) Replace overly-permissive INSERT policy on book_submissions with a validated one
DROP POLICY IF EXISTS "Anyone can submit a book" ON public.book_submissions;

CREATE POLICY "Anyone can submit a book with valid data"
ON public.book_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(first_name))    BETWEEN 1 AND 80
  AND length(btrim(last_name)) BETWEEN 1 AND 80
  AND length(btrim(book_title)) BETWEEN 1 AND 200
  AND length(btrim(author_email)) BETWEEN 3 AND 255
  AND author_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(btrim(description)) BETWEEN 20 AND 2000
  AND length(btrim(genre)) BETWEEN 1 AND 80
  AND length(btrim(draft_number)) BETWEEN 1 AND 40
  AND word_count > 0
  AND word_count <= 2000000
  AND length(btrim(file_path)) BETWEEN 1 AND 512
  AND length(btrim(file_name)) BETWEEN 1 AND 255
);

-- 2) Tighten storage upload policy: require path to begin with a UUID prefix
--    (matches the crypto.randomUUID()-<safeName> naming used by the app) so a
--    caller cannot overwrite another submitter's file at an arbitrary path.
DROP POLICY IF EXISTS "Anyone can upload book files" ON storage.objects;

CREATE POLICY "Anyone can upload book files with uuid-prefixed names"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'book-submissions'
  AND name ~ '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}-.+'
);
