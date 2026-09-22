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
      <p>Every breed we raise is small enough to travel anywhere with you, but each one is different. Here is a quick guide to help you pick the right fit for your home.</p>

      <h3>Yorkie: Confident and Bold</h3>
      <p>Yorkies are tiny but fearless, with a silky coat and a big dog attitude. Great for owners who want a spirited, loving companion in a 3 to 7 pound body.</p>

      <h3>Maltipoo: Gentle and Sheds Very Little</h3>
      <p>A mix of Maltese and Poodle, the Maltipoo is famously cuddly and easy on allergies, making it a favorite for families who care about that. Calm, affectionate, and happiest in your lap.</p>

      <h3>Poodle: Smart and Easy to Train</h3>
      <p>Toy Poodles are very smart, shed very little, and eager to please, picking up training fast. A wonderful choice if you want a dog that is easy to teach.</p>

      <h3>Shih Tzu: Sweet and Sociable</h3>
      <p>Shih Tzus are friendly, outgoing lap dogs that do well with kids and other pets. Slightly sturdier than the others, they are a great family companion.</p>

      <h3>Dachshund: Spunky and Playful</h3>
      <p>Miniature Dachshunds bring a lot of fun and energy in a long, low body. Bold and playful, they are perfect for owners who want a dog with personality to spare.</p>

      <h3>Choosing the Right Puppy for Your Home</h3>
      <p>Think about coat care (Poodles and Maltipoos that shed very little suit people with allergies), energy level, and how much lap time you want. Whichever breed you choose, always ask about health checks, vaccinations and socialization before bringing a puppy home.</p>
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
      "The first month sets the tone for your puppy's whole life. Here is what to expect and how to prepare, especially for a small teacup breed.",
    content: `
      <h2>Before Your Puppy Arrives</h2>
      <p>Get your home ready, pick a vet who has experience with small breeds, and set up a space with a crate, bed, and food and water bowls. Decide on a feeding schedule before your puppy comes home so everyone in the household stays consistent.</p>

      <h3>Week One: Settling In</h3>
      <p>Expect some whining the first few nights. This is normal. Keep the crate near your bedroom at first, stick to a steady potty schedule, and do not overwhelm your puppy with too many visitors right away. Teacup breeds are delicate as puppies, so watch play with children and other pets closely.</p>

      <h3>Weeks Two to Four: Building a Routine</h3>
      <p>Start basic house training in earnest, add short training sessions that use rewards, and begin gentle socializing. This means new sounds, new surfaces, and once fully vaccinated, safe introductions to other dogs.</p>

      <h3>Health Checklist</h3>
      <p>Book your first vet visit within 72 hours of pickup, keep up with the vaccination schedule your breeder gave you, and ask about dental care early. Small breeds are prone to dental problems, so starting good habits young matters.</p>
    `,
    image: allPhotos[7],
    published: true,
  },
];
