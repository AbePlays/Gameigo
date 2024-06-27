import { Game } from '@schemas/game';

const mockGame = {
  released: '2021-11-08',
  slug: 'forza-horizon-5',
  id: 622492,
  background_image: 'https://media.rawg.io/media/games/082/082365507ff04d456c700157072d35db.jpg',
  playtime: 10,
  tba: false,
  genres: [
    {
      name: 'Action',
      id: 4,
    },
    {
      id: 3,
      name: 'Adventure',
    },
    {
      id: 14,
      name: 'Simulation',
    },
    {
      id: 15,
      name: 'Sports',
    },
    {
      id: 1,
      name: 'Racing',
    },
  ],
  name: 'Forza Horizon 5',
  parent_platforms: [
    {
      platform: {
        id: 1,
        name: 'PC',
      },
    },
    {
      platform: {
        id: 3,
        name: 'Xbox',
      },
    },
  ],
} satisfies Game;

const mockGameInfo = {
  background_image: 'https://media.rawg.io/media/games/018/01857c5ff9579c48fa8bd76b4d83a946.jpg',
  description:
    '<p>“DEATHLOOP” transports players to the lawless island of Blackreef in an eternal struggle between two extraordinary assassins. Explore stunning environments and meticulously designed levels in an immersive gameplay experience that lets you approach every situation any way you like. Hunt down targets all over the island in an effort to put an end to the cycle once and for all, and remember, if at first you don’t succeed… die, die again.</p>',
  description_raw:
    '“DEATHLOOP” transports players to the lawless island of Blackreef in an eternal struggle between two extraordinary assassins. Explore stunning environments and meticulously designed levels in an immersive gameplay experience that lets you approach every situation any way you like. Hunt down targets all over the island in an effort to put an end to the cycle once and for all, and remember, if at first you don’t succeed… die, die again.',
  genres: [
    {
      id: 4,
      name: 'Action',
      slug: 'action',
      games_count: 133220,
      image_background: 'https://media.rawg.io/media/games/f87/f87457e8347484033cb34cde6101d08d.jpg',
    },
    {
      id: 5,
      name: 'RPG',
      slug: 'role-playing-games-rpg',
      games_count: 40624,
      image_background: 'https://media.rawg.io/media/games/4e6/4e6e8e7f50c237d76f38f3c885dae3d2.jpg',
    },
  ],
  id: 326251,
  metacritic: 88,
  name: 'Deathloop',
  parent_platforms: [
    {
      platform: {
        id: 1,
        name: 'PC',
        slug: 'pc',
      },
    },
    {
      platform: {
        id: 2,
        name: 'PlayStation',
        slug: 'playstation',
      },
    },
  ],
  playtime: 7,
  publishers: [
    {
      id: 339,
      name: 'Bethesda Softworks',
      slug: 'bethesda-softworks',
      games_count: 162,
      image_background: 'https://media.rawg.io/media/games/d5f/d5fd2f970f48d0877a53aec98825faba.jpg',
    },
  ],
  released: '2021-09-14',
  slug: 'deathloop-2',
  stores: [
    {
      id: 510718,
      url: '',
      store: {
        id: 3,
        name: 'PlayStation Store',
        slug: 'playstation-store',
        domain: 'store.playstation.com',
        games_count: 7685,
        image_background: 'https://media.rawg.io/media/games/c4b/c4b0cab189e73432de3a250d8cf1c84e.jpg',
      },
    },
    {
      id: 512441,
      url: '',
      store: {
        id: 1,
        name: 'Steam',
        slug: 'steam',
        domain: 'store.steampowered.com',
        games_count: 56919,
        image_background: 'https://media.rawg.io/media/games/b7d/b7d3f1715fa8381a4e780173a197a615.jpg',
      },
    },
  ],
  website: 'https://bethesda.net/en/game/deathloop',
};

const mockScreenshots = {
  count: 6,
  next: '',
  previous: '',
  results: [
    {
      id: 2934405,
      image: 'https://media.rawg.io/media/screenshots/115/1150f954fe98f1b0913540b37d4d9815.jpg',
      width: 1920,
      height: 1080,
      is_deleted: false,
    },
    {
      id: 2934406,
      image: 'https://media.rawg.io/media/screenshots/271/271c92208b15bd69af75fb9d8bd63fe8.jpg',
      width: 1920,
      height: 1080,
      is_deleted: false,
    },
    {
      id: 2934407,
      image: 'https://media.rawg.io/media/screenshots/b9a/b9a8f300bfa3e90dcf0e4600b41cff12.jpg',
      width: 1920,
      height: 1080,
      is_deleted: false,
    },
    {
      id: 2934408,
      image: 'https://media.rawg.io/media/screenshots/4b1/4b1a2ee4267624067fb3e61deb469bd8.jpg',
      width: 1920,
      height: 1080,
      is_deleted: false,
    },
    {
      id: 2934409,
      image: 'https://media.rawg.io/media/screenshots/6d8/6d8eb3cd202eb20a57ab925455b9d6e2.jpg',
      width: 1920,
      height: 1080,
      is_deleted: false,
    },
    {
      id: 2934410,
      image: 'https://media.rawg.io/media/screenshots/ca7/ca7e88fbfebe19d34f6b916835c8901b.jpg',
      width: 1920,
      height: 1080,
      is_deleted: false,
    },
  ],
};

const mockEmail = 'michaelscott@dundermifflin.com';
const mockHeading = 'Dunder Mifflin';
const mockLink = 'https://dunder-mifflin.store/';
const mockPassword = 'bigb**bz';
const mockText = 'Regional Manager, Scranton, Dunder Mifflin';
const mockTitle = 'Michael Scott';

export { mockEmail, mockGame, mockGameInfo, mockHeading, mockLink, mockPassword, mockScreenshots, mockText, mockTitle };
