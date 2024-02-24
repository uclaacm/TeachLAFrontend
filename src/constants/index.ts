// TODO: Break up large constants file into smaller constants file

export const PHOTO_NAMES = {
  lightbulb: '/img/icons/lightbulb.png',
  orange: '/img/icons/orange.png',
  pear: '/img/icons/pear.png',
  apple: '/img/icons/apple.png',
  hotdog: '/img/icons/hotdog.png',
  icecream: '/img/icons/icecream.png',
  cloud: '/img/icons/cloud.png',
  earth: '/img/icons/earth.png',
  heart: '/img/icons/heart.png',
};

export const DEFAULT_PHOTO_NAME = PHOTO_NAMES.icecream;

// GH Repo for FE

export const GH_REPO_NAME = 'https://github.com/uclaacm/TeachLAFrontend';

// Router's base (i.e. anything after the domain)

export const ROUTER_BASE_NAME = '/';

// Various Server URLs
let SERVER_URL = 'http://localhost:8081';
if (import.meta.env.VITE_BACKEND === 'staging') {
  SERVER_URL = 'https://tla-backend-staging.herokuapp.com';
}
if (import.meta.env.VITE_BACKEND === 'prod') {
  SERVER_URL = 'https://tla-backend-prod.herokuapp.com';
}

export const PANEL_SIZE = 250;
export const PANEL_IMAGE_SELECTOR_SIZE = 325;
export const CLOSED_PANEL_LEFT = -1 * PANEL_SIZE;
export const OPEN_PANEL_LEFT = 0;

// Editor and Output constants
// View Mode
export const CODE_AND_OUTPUT = 0;
export const CODE_ONLY = 1;
export const OUTPUT_ONLY = 2;

// UI
export const EDITOR_WIDTH_BREAKPOINT = 1000;

export const ThumbnailArray = [
  'Ant',
  'Badger',
  'Bear',
  'Beaver',
  'Bird',
  'Bug',
  'Bull',
  'Bumblebee',
  'Butterfly',
  'Cat',
  'Caterpillar',
  'Chicken',
  'Clown Fish',
  'Corgi',
  'Cow',
  'Crab',
  'Deer',
  'Dinosaur',
  'Dog',
  'Dolphin',
  'Dragonfly',
  'Duck',
  'Elephant',
  'Falcon',
  'Fish',
  'Fly',
  'Frog',
  'Giraffe',
  'Gorilla',
  'Grasshopper',
  'Horse',
  'Hummingbird',
  'Insect',
  'Kangaroo',
  'Kiwi Bird',
  'Ladybird',
  'Leopard',
  'Lion',
  'Llama',
  'Mite',
  'Mosquito',
  'Octopus',
  'Panda',
  'Prawn',
  'Puffin Bird',
  'Rabbit',
  'Rhinoceros',
  'Seahorse',
  'Shark',
  'Sheep',
  'Snail',
  'Spider',
  'Starfish',
  'Stork',
  'Turtle',
  'Unicorn',
  'Whale',
  'Wolf',
];

// Registration requirements
export const MINIMUM_USERNAME_LENGTH = 6;
export const MINIMUM_PASSWORD_LENGTH = 6;
export const MINIMUM_DISPLAY_NAME_LENGTH = 1;
export const MAXIMUM_USERNAME_LENGTH = 32;
export const MAXIMUM_PASSWORD_LENGTH = 128;
export const MAXIMUM_DISPLAY_NAME_LENGTH = 25;

// UI constants
export const RING_LOADER_SIZE = 50;

// Firebase constants
export const EMAIL_DOMAIN_NAME = '@fake.com';

export default {
  // photo names
  PHOTO_NAMES,
  DEFAULT_PHOTO_NAME,

  GH_REPO_NAME,

  // Router Base Name
  ROUTER_BASE_NAME,

  // Server Host Name
  SERVER_URL,

  // User value constants
  MINIMUM_USERNAME_LENGTH,
  MINIMUM_PASSWORD_LENGTH,
  MINIMUM_DISPLAY_NAME_LENGTH,
  MAXIMUM_USERNAME_LENGTH,
  MAXIMUM_PASSWORD_LENGTH,
  MAXIMUM_DISPLAY_NAME_LENGTH,

  // UI constants
  RING_LOADER_SIZE,
  PANEL_SIZE,
  CLOSED_PANEL_LEFT,
  OPEN_PANEL_LEFT,

  // editor constants:
  CODE_AND_OUTPUT,
  CODE_ONLY,
  OUTPUT_ONLY,

  // UI
  EDITOR_WIDTH_BREAKPOINT,

  // Firebase constants
  EMAIL_DOMAIN_NAME,
  PANEL_IMAGE_SELECTOR_SIZE,

  ThumbnailArray,
};
