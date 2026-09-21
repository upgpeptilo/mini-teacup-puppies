/**
 * Real photos from dog.ceo's free breed-photo API (no key required), one
 * array per breed we sell. dog.ceo has no "maltipoo" category (it's a mixed
 * breed, not a registry breed) — Maltese photos stand in as the closest
 * visual match. Only 9 photos per breed, so slots across the site reuse
 * them; that's fine, just avoid repeats within one visual group (a single
 * dog's own images, a slideshow).
 */
export const yorkiePhotos = [
  'https://images.dog.ceo/breeds/terrier-yorkshire/n02094433_10184.jpg',
  'https://images.dog.ceo/breeds/terrier-yorkshire/n02094433_478.jpg',
  'https://images.dog.ceo/breeds/terrier-yorkshire/n02094433_8419.jpg',
  'https://images.dog.ceo/breeds/terrier-yorkshire/n02094433_1376.jpg',
  'https://images.dog.ceo/breeds/terrier-yorkshire/n02094433_2901.jpg',
  'https://images.dog.ceo/breeds/terrier-yorkshire/n02094433_2519.jpg',
  'https://images.dog.ceo/breeds/terrier-yorkshire/n02094433_8977.jpg',
  'https://images.dog.ceo/breeds/terrier-yorkshire/n02094433_10124.jpg',
  'https://images.dog.ceo/breeds/terrier-yorkshire/n02094433_7464.jpg',
] as const;

// dog.ceo has no dedicated "maltipoo" breed — using Maltese (one of its two
// parent breeds) as the closest available free stock photo stand-in.
export const maltipooPhotos = [
  'https://images.dog.ceo/breeds/maltese/n02085936_9141.jpg',
  'https://images.dog.ceo/breeds/maltese/n02085936_2543.jpg',
  'https://images.dog.ceo/breeds/maltese/n02085936_137.jpg',
  'https://images.dog.ceo/breeds/maltese/n02085936_7537.jpg',
  'https://images.dog.ceo/breeds/maltese/n02085936_126.jpg',
  'https://images.dog.ceo/breeds/maltese/n02085936_6650.jpg',
  'https://images.dog.ceo/breeds/maltese/n02085936_10377.jpg',
  'https://images.dog.ceo/breeds/maltese/n02085936_17059.jpg',
  'https://images.dog.ceo/breeds/maltese/n02085936_4921.jpg',
] as const;

export const poodlePhotos = [
  'https://images.dog.ceo/breeds/poodle-toy/n02113624_2595.jpg',
  'https://images.dog.ceo/breeds/poodle-toy/n02113624_1293.jpg',
  'https://images.dog.ceo/breeds/poodle-toy/koro.jpg',
  'https://images.dog.ceo/breeds/poodle-toy/n02113624_4221.jpg',
  'https://images.dog.ceo/breeds/poodle-toy/n02113624_530.jpg',
  'https://images.dog.ceo/breeds/poodle-toy/n02113624_8963.jpg',
  'https://images.dog.ceo/breeds/poodle-toy/n02113624_1801.jpg',
  'https://images.dog.ceo/breeds/poodle-toy/n02113624_5367.jpg',
  'https://images.dog.ceo/breeds/poodle-toy/n02113624_213.jpg',
] as const;

export const shihtzuPhotos = [
  'https://images.dog.ceo/breeds/shihtzu/n02086240_5096.jpg',
  'https://images.dog.ceo/breeds/shihtzu/n02086240_323.jpg',
  'https://images.dog.ceo/breeds/shihtzu/n02086240_3827.jpg',
  'https://images.dog.ceo/breeds/shihtzu/n02086240_11139.jpg',
  'https://images.dog.ceo/breeds/shihtzu/n02086240_254.jpg',
  'https://images.dog.ceo/breeds/shihtzu/toby123214314.jpg',
  'https://images.dog.ceo/breeds/shihtzu/n02086240_1725.jpg',
  'https://images.dog.ceo/breeds/shihtzu/zoi_4.jpg',
  'https://images.dog.ceo/breeds/shihtzu/n02086240_3979.jpg',
] as const;

export const dachshundPhotos = [
  'https://images.dog.ceo/breeds/dachshund/dog-495122_640.jpg',
  'https://images.dog.ceo/breeds/dachshund/dash_dachshund_with_hat.jpg',
  'https://images.dog.ceo/breeds/dachshund/tina.jpg',
  'https://images.dog.ceo/breeds/dachshund/dachshund-5.jpg',
  'https://images.dog.ceo/breeds/dachshund/dog-495133_640.jpg',
  'https://images.dog.ceo/breeds/dachshund/miniature_daschund.jpg',
  'https://images.dog.ceo/breeds/dachshund/dog-1083690_640.jpg',
  'https://images.dog.ceo/breeds/dachshund/dachshund_4.jpg',
  'https://images.dog.ceo/breeds/dachshund/daschund-shorthair.jpg',
] as const;

// Breed-agnostic picks for spots that just need "a cute teacup puppy photo"
// (hero, slideshow, blog banners, page heroes) rather than a specific breed.
export const allPhotos = [
  yorkiePhotos[0],
  maltipooPhotos[0],
  poodlePhotos[0],
  shihtzuPhotos[0],
  dachshundPhotos[0],
  yorkiePhotos[1],
  maltipooPhotos[1],
  poodlePhotos[1],
  shihtzuPhotos[1],
  dachshundPhotos[1],
] as const;
