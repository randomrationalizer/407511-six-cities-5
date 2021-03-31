import {adaptOfferToClient} from "../../utils/adapter";

const favorites = [
  {
    "city": {
      "name": "Paris",
      "location": {
        "latitude": 48.85661,
        "longitude": 2.351499,
        "zoom": 13
      }
    },
    "preview_image": "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/8.jpg",
    "images": [
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/15.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/5.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/10.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/13.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/8.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/1.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/20.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/2.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/7.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/14.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/17.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/19.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/6.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/3.jpg"
    ],
    "title": "The Pondhouse - A Magical Place",
    "is_favorite": true,
    "is_premium": false,
    "rating": 2.2,
    "type": "house",
    "bedrooms": 3,
    "max_adults": 3,
    "price": 111,
    "goods": [
      "Laptop friendly workspace",
      "Breakfast",
      "Washer"
    ],
    "host": {
      "id": 25,
      "name": "Angelina",
      "is_pro": true,
      "avatar_url": "img/avatar-angelina.jpg"
    },
    "description": "Discover daily local life in city center, friendly neighborhood, clandestine casino, karaoke, old-style artisans, art gallery and artist studio downstairs.",
    "location": {
      "latitude": 48.861610000000006,
      "longitude": 2.340499,
      "zoom": 16
    },
    "id": 66
  },
  {
    "city": {
      "name": "Hamburg",
      "location": {
        "latitude": 53.550341,
        "longitude": 10.000654,
        "zoom": 13
      }
    },
    "preview_image": "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/9.jpg",
    "images": [
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/7.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/10.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/12.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/1.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/5.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/13.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/4.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/9.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/16.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/20.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/3.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/2.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/6.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/14.jpg"
    ],
    "title": "Penthouse, 4-5 rooms + 5 balconies",
    "is_favorite": true,
    "is_premium": false,
    "rating": 3.1,
    "type": "room",
    "bedrooms": 1,
    "max_adults": 2,
    "price": 190,
    "goods": [
      "Laptop friendly workspace"
    ],
    "host": {
      "id": 25,
      "name": "Angelina",
      "is_pro": true,
      "avatar_url": "img/avatar-angelina.jpg"
    },
    "description": "Relax, rejuvenate and unplug in this ultimate rustic getaway experience in the country. In our beautiful screened Pondhouse, you can gaze at the stars and listen to the sounds of nature from your cozy warm bed.",
    "location": {
      "latitude": 53.558341000000006,
      "longitude": 9.999654000000001,
      "zoom": 16
    },
    "id": 67
  },
  {
    "city": {
      "name": "Hamburg",
      "location": {
        "latitude": 53.550341,
        "longitude": 10.000654,
        "zoom": 13
      }
    },
    "preview_image": "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/9.jpg",
    "images": [
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/1.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/19.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/15.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/9.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/17.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/12.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/6.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/8.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/18.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/2.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/16.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/10.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/20.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/13.jpg"
    ],
    "title": "Loft Studio in the Central Area",
    "is_favorite": true,
    "is_premium": true,
    "rating": 3.5,
    "type": "hotel",
    "bedrooms": 2,
    "max_adults": 6,
    "price": 301,
    "goods": [
      "Baby seat",
      "Washer",
      "Breakfast",
      "Laptop friendly workspace",
      "Fridge",
      "Towels",
      "Air conditioning",
      "Dishwasher"
    ],
    "host": {
      "id": 25,
      "name": "Angelina",
      "is_pro": true,
      "avatar_url": "img/avatar-angelina.jpg"
    },
    "description": "A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.",
    "location": {
      "latitude": 53.565341,
      "longitude": 9.980654000000001,
      "zoom": 16
    },
    "id": 68
  },
  {
    "city": {
      "name": "Cologne",
      "location": {
        "latitude": 50.938361,
        "longitude": 6.959974,
        "zoom": 13
      }
    },
    "preview_image": "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/11.jpg",
    "images": [
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/17.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/18.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/6.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/8.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/12.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/5.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/9.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/13.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/10.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/16.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/3.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/20.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/14.jpg",
      "https://assets.htmlacademy.ru/intensives/javascript-3/hotel/19.jpg"
    ],
    "title": "Penthouse, 4-5 rooms + 5 balconies",
    "is_favorite": true,
    "is_premium": true,
    "rating": 5,
    "type": "room",
    "bedrooms": 1,
    "max_adults": 2,
    "price": 228,
    "goods": [
      "Baby seat",
      "Air conditioning",
      "Breakfast",
      "Fridge",
      "Washer",
      "Towels",
      "Dishwasher",
      "Laptop friendly workspace",
      "Coffee machine"
    ],
    "host": {
      "id": 25,
      "name": "Angelina",
      "is_pro": true,
      "avatar_url": "img/avatar-angelina.jpg"
    },
    "description": "This is a place for dreamers to reset, reflect, and create. Designed with a 'slow' pace in mind, our hope is that you enjoy every part of your stay; from making local coffee by drip in the morning, choosing the perfect record to put on as the sun sets.",
    "location": {
      "latitude": 50.932361,
      "longitude": 6.937974,
      "zoom": 16
    },
    "id": 69
  }
];

const mockFavorites = favorites.map(adaptOfferToClient);

export {favorites};
export default mockFavorites;
