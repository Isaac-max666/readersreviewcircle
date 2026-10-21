// Shared mock data for reviews
import smuklerCover from "@/assets/inside-the-mind-of-a-psychiatrist.jpg.asset.json";
export type Review = {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  cover: string;
  summary: string;
  reviewer: string;
  date: string;
};

const covers = [
  "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&q=80",
  "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=600&q=80",
  "https://images.unsplash.com/photo-1531901599143-df5010ab9438?w=600&q=80",
  "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=600&q=80",
  "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=600&q=80",
  "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=600&q=80",
  "https://images.unsplash.com/photo-1589998059171-988d887df646?w=600&q=80",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80",
];

export const GENRES = [
  "Fiction", "Romance", "Mystery", "Fantasy",
  "Self-help", "Business", "Biography", "Non-fiction",
] as const;

export const REVIEWS: Review[] = [
  {
    id: "1",
    title: "Inside the Mind of a Psychiatrist",
    author: "Art Smukler",
    genre: "PSYCHOLOGY, MEMOIR",
    rating: 3,
    cover: smuklerCover.url,
    summary: "Before introducing his patients, Art Smukler introduces himself as someone who needed help. That decision gives this career memoir a personal foundation. Through his own analysis, family life and psychiatric practice, he examines the difficulty of listening without allowing personal assumptions to take over. The accounts of Jerome, Bobby and Polly are particularly revealing because progress does not always mean what the doctor initially expects. Some explanations and broader claims need greater qualification, but the candid moments of learning give the book its strongest appeal.",
    reviewer: "Readers Review Circle.",
    date: "September 2026",
  },
  {
    id: "2",
    title: "The Circle of Wind: Beginnings, Part One",
    author: "Stuart Lean",
    genre: "FANTASY",
    rating: 3.5,
    cover: covers[1],
    summary: "Two young lives take shape in a world of dangerous institutions, family traditions and demanding magic. Kethlys and Bella approach strength from different directions: one must discover her agency, while the other must learn what her choices cost others. Birth-swords, healing lessons and complicated loyalties give this opening installment its character. Detailed world-building sometimes slows the action, but the relationships and moral consequences provide reasons to continue. A dark beginning for readers who enjoy substantial magical systems and developing character journeys.",
    reviewer: "Theodore Hayes",
    date: "March 2026",
  },
  {
    id: "3",
    title: "Letters She Never Sent",
    author: "Priya Anand",
    genre: "Romance",
    rating: 5,
    cover: covers[2],
    summary: "Aching, tender, and refreshingly grown-up. A romance for readers who believe restraint can be the loudest declaration.",
    reviewer: "Sarah Okonkwo",
    date: "February 2026",
  },
  {
    id: "4",
    title: "The Quiet Empire",
    author: "James Whitlock",
    genre: "Business",
    rating: 4,
    cover: covers[3],
    summary: "An unusually literate take on legacy companies and the leaders who steward them — no hype, no gurus, just craft.",
    reviewer: "Bertha Reagan",
    date: "February 2026",
  },
  {
    id: "5",
    title: "Ashes of the Eight Towers",
    author: "R. M. Calder",
    genre: "Fantasy",
    rating: 5,
    cover: covers[4],
    summary: "Worldbuilding of rare conviction. Calder writes as though every kingdom owes you a debt of detail — and then pays it.",
    reviewer: "Lillian Park",
    date: "January 2026",
  },
  {
    id: "6",
    title: "Slow Mornings",
    author: "Anya Bell",
    genre: "Self-help",
    rating: 4,
    cover: covers[5],
    summary: "A gentle counterweight to productivity culture. Bell's chapters read like long letters from a wise older sister.",
    reviewer: "Margaret Chen",
    date: "January 2026",
  },
  {
    id: "7",
    title: "Composing a Life: Eudora Welty",
    author: "Harper Lassiter",
    genre: "Biography",
    rating: 5,
    cover: covers[6],
    summary: "A biographer who understands that the writer's room is also a portrait. Essential for anyone who loves Southern letters.",
    reviewer: "Theodore Hayes",
    date: "December 2025",
  },
  {
    id: "8",
    title: "The Last Forest Floor",
    author: "Dr. Amelia Crane",
    genre: "Non-fiction",
    rating: 4,
    cover: covers[7],
    summary: "Reportage that reads like nature writing of the highest order. Urgent without ever feeling shrill.",
    reviewer: "Sarah Okonkwo",
    date: "December 2025",
  },
];

export const TESTIMONIALS = [
  {
    quote: "Receiving a Readers Review Circle review felt like being read by people who actually read. Their notes shaped my next draft.",
    name: "Elena Marchetti",
    role: "Author, The Cartographer's Daughter",
  },
  {
    quote: "Bertha and her circle of readers are the rare reviewers whose opinions I trust before I buy. They've redefined what a reading community can be.",
    name: "Harper Lassiter",
    role: "Biographer",
  },
  {
    quote: "Thoughtful, generous, and rigorous. We've sent dozens of titles their way and every review has been a model of literary care.",
    name: "Northbridge Press",
    role: "Independent Publisher",
  },
  {
    quote: "As a reader, this is now the first place I look for honest recommendations. No hype, no algorithms — just considered taste.",
    name: "Margaret Chen",
    role: "Member since 2022",
  },
];

export const BLOG_POSTS = [
  { id: "writing-the-review", category: "Review Craft", title: "Writing the Review: On Generosity Without Flattery", excerpt: "The reviewer's first duty is to the reader, the second to the writer, the third to the book itself. How we hold all three in mind.", date: "April 12, 2026", read: "7 min" },
  { id: "monthly-march", category: "Monthly Highlights", title: "March Highlights: Six Titles Worth Your Evening", excerpt: "A coastal mystery, a luminous family saga, and four other books our readers couldn't put down this month.", date: "April 1, 2026", read: "5 min" },
  { id: "spotlight-marchetti", category: "Author Spotlight", title: "In Conversation with Elena Marchetti", excerpt: "On inheritance, the long novel, and writing in the margins of three languages.", date: "March 22, 2026", read: "11 min" },
  { id: "reading-culture", category: "Reading Culture", title: "Why Slow Reading Is a Radical Act in 2026", excerpt: "Notes on attention, taste, and the small rebellion of finishing a chapter before reaching for your phone.", date: "March 14, 2026", read: "6 min" },
  { id: "analysis-folk", category: "Literary Analysis", title: "The Quiet Return of the Folk Novel", excerpt: "From Voss to Calder, a new generation is borrowing the bones of folklore — and refusing the lessons.", date: "March 3, 2026", read: "9 min" },
  { id: "spotlight-anand", category: "Author Spotlight", title: "Priya Anand on the Romance of Restraint", excerpt: "The author of Letters She Never Sent on why she trusts her readers to feel without instruction.", date: "February 20, 2026", read: "8 min" },
];
