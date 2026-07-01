
CREATE TABLE public.book_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  book_title TEXT NOT NULL,
  author_email TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  description TEXT NOT NULL,
  genre TEXT NOT NULL,
  draft_number TEXT NOT NULL,
  word_count INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.book_submissions TO anon;
GRANT INSERT ON public.book_submissions TO authenticated;
GRANT ALL ON public.book_submissions TO service_role;

ALTER TABLE public.book_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a book" ON public.book_submissions
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Storage policies: allow anonymous uploads to book-submissions bucket
CREATE POLICY "Anyone can upload book files"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'book-submissions');
