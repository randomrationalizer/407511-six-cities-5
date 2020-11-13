import {getPhoto, generateDescription} from "./util.js";


export const offers = [
  {
    id: `1`,
    title: `Beautiful & luxurious apartment at great location `,
    city: `Amsterdam`,
    coords: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198
    },
    price: 6000,
    type: `apartment`,
    description: generateDescription(),
    bedrooms: 3,
    guests: 4,
    rating: 4.8,
    photos: [
      {
        src: getPhoto(),
        description: ``
      },
      {
        src: getPhoto(),
        description: ``
      },
      {
        src: getPhoto(),
        description: ``
      }
    ],
    options: [`Wi-Fi`, `Washing machine`, `Towels`],
    owner: {
      name: `Angelina`,
      avatar: getPhoto(),
      isHighRated: true
    },
    isPremial: true
  },

  {
    id: `2`,
    title: `Nice, cozy, warm big bed room`,
    city: `Amsterdam`,
    coords: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198
    },
    price: 20,
    type: `room`,
    description: generateDescription(),
    bedrooms: 1,
    guests: 1,
    rating: 3.4,
    photos: [
      {
        src: getPhoto(),
        description: ``
      },
      {
        src: getPhoto(),
        description: ``
      },
      {
        src: getPhoto(),
        description: ``
      },
      {
        src: getPhoto(),
        description: ``
      },
      {
        src: getPhoto(),
        description: ``
      }
    ],
    options: [`Coffee machine`, `Baby seat`, `Kitchen`, `Dishwasher`],
    owner: {
      name: `Mike`,
      avatar: getPhoto(),
      isHighRated: false
    },
    isPremial: false
  },

  {
    id: `3`,
    title: `Canal View Prinsengracht`,
    city: `Amsterdam`,
    coords: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198
    },
    price: 200,
    type: `hotel`,
    description: generateDescription(),
    bedrooms: 2,
    guests: 3,
    rating: 4.1,
    photos: [
      {
        src: getPhoto(),
        description: ``
      }
    ],
    options: [`Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`],
    owner: {
      name: `Bob`,
      avatar: getPhoto(),
      isHighRated: true
    },
    isPremial: false
  },

  {
    id: `4`,
    title: ` Wood and stone place`,
    city: `Amsterdam`,
    coords: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198
    },
    price: 1000,
    type: `house`,
    description: generateDescription(),
    bedrooms: 6,
    guests: 7,
    rating: 3.7,
    photos: [
      {
        src: getPhoto(),
        description: ``
      },
      {
        src: getPhoto(),
        description: ``
      }
    ],
    options: [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`, `Coffee machine`, `Baby seat`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`],
    owner: {
      name: `James`,
      avatar: getPhoto(),
      isHighRated: false
    },
    isPremial: false
  }
];
