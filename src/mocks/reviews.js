import {getPhoto, generateDescription} from "../util/mock.js";


export const reviews = [
  {
    propertyId: `1`,
    reviews: [
      {
        author: `John`,
        avatar: getPhoto(),
        rating: 4,
        date: `January 2020`,
        text: generateDescription()
      },
      {
        author: `Ronald`,
        avatar: getPhoto(),
        rating: 5,
        date: `January 2020`,
        text: generateDescription()
      },
      {
        author: `Reuel`,
        avatar: getPhoto(),
        rating: 5,
        date: `January 2020`,
        text: generateDescription()
      },
    ]
  },

  {
    propertyId: `2`,
    reviews: [
      {
        author: `Arthur`,
        avatar: getPhoto(),
        rating: 1,
        date: `January 2020`,
        text: generateDescription()
      },
      {
        author: `Stanislaw`,
        avatar: getPhoto(),
        rating: 3,
        date: `January 2020`,
        text: generateDescription()
      }
    ]
  },

  {
    propertyId: `3`,
    reviews: [
      {
        author: `Robert`,
        avatar: getPhoto(),
        rating: 5,
        date: `April 2019`,
        text: generateDescription()
      },
      {
        author: `Isaac`,
        avatar: getPhoto(),
        rating: 5,
        date: `March 2019`,
        text: generateDescription()
      },
      {
        author: `Max`,
        avatar: getPhoto(),
        rating: 2,
        date: `August 2019`,
        text: generateDescription()
      },
      {
        author: `Andrew`,
        avatar: getPhoto(),
        rating: 1,
        date: `January 2020`,
        text: generateDescription()
      }
    ]
  },

  {
    propertyId: `4`,
    reviews: [
      {
        author: `Cate`,
        avatar: getPhoto(),
        rating: 5,
        date: `January 2020`,
        text: generateDescription()
      }
    ]
  }
];
