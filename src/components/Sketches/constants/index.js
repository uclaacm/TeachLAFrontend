import { SUPPORTED_LANGUAGES } from "../../../util/languages/languages.js";

export const SketchThumbnailArray = [
  "Ant",
  "Badger",
  "Bear",
  "Beaver",
  "Bird",
  "Bug",
  "Bull",
  "Bumblebee",
  "Butterfly",
  "Cat",
  "Caterpillar",
  "Chicken",
  "Clown Fish",
  "Corgi",
  "Cow",
  "Crab",
  "Deer",
  "Dinosaur",
  "Dog",
  "Dolphin",
  "Dragonfly",
  "Duck",
  "Elephant",
  "Falcon",
  "Fish",
  "Fly",
  "Frog",
  "Giraffe",
  "Gorilla",
  "Grasshopper",
  "Horse",
  "Hummingbird",
  "Insect",
  "Kangaroo",
  "Kiwi Bird",
  "Ladybird",
  "Leopard",
  "Lion",
  "Llama",
  "Mite",
  "Mosquito",
  "Octopus",
  "Panda",
  "Prawn",
  "Puffin Bird",
  "Rabbit",
  "Rhinoceros",
  "Seahorse",
  "Shark",
  "Sheep",
  "Snail",
  "Spider",
  "Starfish",
  "Stork",
  "Turtle",
  "Unicorn",
  "Whale",
  "Wolf",
];

export const LanguageDropdownValues = SUPPORTED_LANGUAGES.map(({ value, display }) => ({
  value,
  display,
}));
export const LanguageDropdownDefault = LanguageDropdownValues[0];
