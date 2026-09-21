import { allPhotos } from '@/data/teacupPhotos';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  image: string;
  published: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'choosing-your-teacup-breed',
    title: 'Yorkie, Maltipoo, Poodle, Shih Tzu or Dachshund? Choosing Your Teacup Breed',
    date: '2024-02-10',
    author: 'Mini Teacup Puppies 4 Homes',
    excerpt:
      'All five of our breeds are small and affectionate, but each has its own personality and care needs. Here is what to know before choosing your puppy.',
    content: `
      <h2>Small Dogs, Big Personalities</h2>
      <p>Every breed we raise is compact enough to travel anywhere with you, but each brings something different to the table. Here's a quick rundown to help you pick the right fit for your home.</p>

      <h3>Yorkie — Confident and Bold</h3>
      <p>Yorkies are tiny but fearless, with a silky coat and a big-dog attitude. Great for owners who want a spirited, attention-loving companion in a 3-7 lb frame.</p>

      <h3>Maltipoo — Gentle and Low-Shedding</h3>
      <p>A Maltese-Poodle mix, the Maltipoo is famously cuddly and low-shedding, making it a favorite for allergy-conscious families. Calm, affectionate, and happiest in your lap.</p>

      <h3>Poodle — Smart and Trainable</h3>
      <p>Toy Poodles are whip-smart, low-shedding and eager to please, picking up training fast. A wonderful choice if you want a dog that's easy to teach.</p>

      <h3>Shih Tzu — Sweet and Sociable</h3>
      <p>Shih Tzus are friendly, outgoing lap dogs that do well with kids and other pets. Slightly sturdier than the others, they're a great all-around family companion.</p>

      <h3>Dachshund — Spunky and Playful</h3>
      <p>Miniature Dachshunds bring big comedic energy in a long, low body. Bold and playful, they're perfect for owners who want a dog with personality to spare.</p>

      <h3>Choosing the Right Puppy for Your Home</h3>
      <p>Think about coat care (low-shedding Poodles and Maltipoos suit allergy sufferers), energy level, and how much lap time you want. Whichever breed you choose, always ask about health testing, vaccinations and socialization before bringing a puppy home.</p>
    `,
    image: allPhotos[6],
    published: true,
  },
  {
    id: '2',
    slug: 'bringing-home-your-new-puppy',
    title: 'Bringing Home Your New Puppy: The First 30 Days',
    date: '2024-03-05',
    author: 'Mini Teacup Puppies 4 Homes',
    excerpt:
      'The first month sets the tone for your puppy\'s whole life. Here is what to expect and how to prepare — especially for a small teacup breed.',
    content: `
      <h2>Before Puppy Arrives</h2>
      <p>Puppy-proof your home, pick a vet experienced with small/toy breeds, and set up a dedicated space with a crate, bed and food/water bowls. Decide on a feeding schedule before your puppy comes home so everyone in the household stays consistent.</p>

      <h3>Week One: Settling In</h3>
      <p>Expect some whining the first few nights — this is normal. Keep the crate near your bedroom initially, stick to a consistent potty schedule, and avoid overwhelming your puppy with too many visitors right away. Teacup breeds are delicate as puppies, so supervise play with children and other pets closely.</p>

      <h3>Weeks Two to Four: Building Routine</h3>
      <p>Start basic house training in earnest, introduce short positive-reinforcement training sessions, and begin gentle socialization — new sounds, surfaces and (once fully vaccinated) safe introductions to other dogs.</p>

      <h3>Health Checklist</h3>
      <p>Schedule your first vet visit within 72 hours of pickup, keep up with the vaccination schedule your breeder provided, and ask about dental care early — small breeds are prone to dental issues, so starting good habits young matters.</p>
    `,
    image: allPhotos[7],
    published: true,
  },
];
