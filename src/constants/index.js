// TODO: Break up large constants file into smaller constants file

const { PUBLIC_URL } = process.env;
const PHOTO_NAMES = {
  lightbulb: `${PUBLIC_URL}/img/icons/lightbulb.png`,
  orange: `${PUBLIC_URL}/img/icons/orange.png`,
  pear: `${PUBLIC_URL}/img/icons/pear.png`,
  apple: `${PUBLIC_URL}/img/icons/apple.png`,
  hotdog: `${PUBLIC_URL}/img/icons/hotdog.png`,
  icecream: `${PUBLIC_URL}/img/icons/icecream.png`,
  cloud: `${PUBLIC_URL}/img/icons/cloud.png`,
  earth: `${PUBLIC_URL}/img/icons/earth.png`,
  heart: `${PUBLIC_URL}/img/icons/heart.png`,
};

// GH Repo for FE

const GH_REPO_NAME = 'https://github.com/uclaacm/TeachLAFrontend';

// Router's base (i.e. anything after the domain)

const ROUTER_BASE_NAME = '/';

// Various Server URLs
let SERVER_URL = 'http://localhost:8081';
if (process && process.env) {
  if (process.env.REACT_APP_SERVER_TYPE === 'staging') {
    SERVER_URL = 'https://tla-backend-staging.herokuapp.com';
  }
  if (process.env.REACT_APP_SERVER_TYPE === 'prod') {
    SERVER_URL = 'https://tla-backend-prod.herokuapp.com';
  }
}

const PANEL_SIZE = 250;
const PANEL_IMAGE_SELECTOR_SIZE = 325;

// Editor and Output constants
// View Mode
const CODE_AND_OUTPUT = 0;
const CODE_ONLY = 1;
const OUTPUT_ONLY = 2;

// UI
const EDITOR_WIDTH_BREAKPOINT = 1000;

const ThumbnailArray = [
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

module.exports = {
  // photo names
  PHOTO_NAMES,
  DEFAULT_PHOTO_NAME: 'icecream',

  GH_REPO_NAME,

  // Router Base Name
  ROUTER_BASE_NAME,

  // Server Host Name
  SERVER_URL,

  // User value constants
  MINIMUM_USERNAME_LENGTH: 6,
  MINIMUM_PASSWORD_LENGTH: 6,
  MINIMUM_DISPLAY_NAME_LENGTH: 1,
  MAXIMUM_USERNAME_LENGTH: 32,
  MAXIMUM_PASSWORD_LENGTH: 128,
  MAXIMUM_DISPLAY_NAME_LENGTH: 25,

  // UI constants
  RING_LOADER_SIZE: 50,
  PANEL_SIZE,
  CLOSED_PANEL_LEFT: -1 * PANEL_SIZE,
  OPEN_PANEL_LEFT: 0,

  // editor constants:
  CODE_AND_OUTPUT,
  CODE_ONLY,
  OUTPUT_ONLY,

  // UI
  EDITOR_WIDTH_BREAKPOINT,

  // Firebase constants
  EMAIL_DOMAIN_NAME: '@fake.com',
  PANEL_IMAGE_SELECTOR_SIZE,

  ThumbnailArray,
};
