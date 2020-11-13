import {getPhoto, generateDescription} from "./util.js";


export const reviews = [
  {
    propertyId: `1`,
    reviews: [
      {
        author: `John`,
        avatar: getPhoto(),
        rating: 4,
        date: `2020-01-05`,
        text: generateDescription()
      },
      {
        author: `Ronald`,
        avatar: getPhoto(),
        rating: 5,
        date: `2020-03-05`,
        text: generateDescription()
      },
      {
        author: `Reuel`,
        avatar: getPhoto(),
        rating: 5,
        date: `2020-08-05`,
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
        date: `2020-01-05`,
        text: generateDescription()
      },
      {
        author: `Stanislaw`,
        avatar: getPhoto(),
        rating: 3,
        date: `2020-05-05`,
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
        date: `2019-04-05`,
        text: generateDescription()
      },
      {
        author: `Isaac`,
        avatar: getPhoto(),
        rating: 5,
        date: `2019-03-05`,
        text: generateDescription()
      },
      {
        author: `Max`,
        avatar: getPhoto(),
        rating: 2,
        date: `2019-08-05`,
        text: generateDescription()
      },
      {
        author: `Andrew`,
        avatar: getPhoto(),
        rating: 1,
        date: `2020-01-05`,
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
        date: `2020-01-05`,
        text: generateDescription()
      }
    ]
  }
];
