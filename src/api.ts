import { Restaurant } from "./types";

const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "The Golden Spoon",
    description:
      "A fine dining experience with a menu that changes daily based on the freshest ingredients available.",
    address: "123 Main St. Anytown USA",
    score: 4.5,
    ratings: 100,
    image: "https://source.unsplash.com/480x300/?restaurant&random=1",
  },
  {
    id: "2",
    name: "La Piazza",
    description: "Authentic Italian cuisine in a cozy atmosphere with outdoor seating available.",
    address: "456 Oak Ave. Anytown USA",
    score: 4.2,
    ratings: 80,
    image: "https://source.unsplash.com/480x300/?restaurant&random=2",
  },
  {
    id: "3",
    name: "The Sizzling Skillet",
    description:
      "A family-friendly restaurant with a wide variety of dishes. including vegetarian and gluten-free options.",
    address: "789 Elm St. Anytown USA",
    score: 4.8,
    ratings: 120,
    image: "https://source.unsplash.com/480x300/?restaurant&random=3",
  },
  {
    id: "4",
    name: "The Hungry Bear",
    description: "A rustic cabin-style restaurant serving hearty portions of comfort food.",
    address: "101 Forest Rd. Anytown USA",
    score: 4.0,
    ratings: 60,
    image: "https://source.unsplash.com/480x300/?restaurant&random=4",
  },
  {
    id: "5",
    name: "The Spice Route",
    description: "A fusion restaurant that combines the flavors of India. Thailand. and China.",
    address: "246 Main St. Anytown USA",
    score: 4.6,
    ratings: 90,
    image: "https://source.unsplash.com/480x300/?restaurant&random=5",
  },
  {
    id: "6",
    name: "The Catch of the Day",
    description: "A seafood restaurant with a focus on locally-sourced. sustainable ingredients.",
    address: "369 Beach Blvd. Anytown USA",
    score: 4.3,
    ratings: 70,
    image: "https://source.unsplash.com/480x300/?restaurant&random=6",
  },
  {
    id: "7",
    name: "The Garden Cafe",
    description: "A vegetarian restaurant with a beautiful outdoor garden seating area.",
    address: "753 Maple St. Anytown USA",
    score: 4.9,
    ratings: 150,
    image: "https://source.unsplash.com/480x300/?restaurant&random=7",
  },
  {
    id: "8",
    name: "The Burger Joint",
    description: "A classic American diner with a wide variety of burgers. fries. and milkshakes.",
    address: "852 Oak Ave. Anytown USA",
    score: 3.9,
    ratings: 50,
    image: "https://source.unsplash.com/480x300/?restaurant&random=8",
  },
  {
    id: "9",
    name: "The Cozy Corner",
    description:
      "A small cafe with a warm and inviting atmosphere. serving breakfast and lunch dishes.",
    address: "963 Main St. Anytown USA",
    score: 4.7,
    ratings: 110,
    image: "https://source.unsplash.com/480x300/?restaurant&random=9",
  },
  {
    id: "10",
    name: "The Steakhouse",
    description: "A high-end restaurant specializing in premium cuts of beef and fine wines.",
    address: "1479 Elm St. Anytown USA",
    score: 4.1,
    ratings: 75,
    image: "https://source.unsplash.com/480x300/?restaurant&random=10",
  },
  {
    id: "11",
    name: "The Taco Truck",
    description: "A casual Mexican restaurant serving authentic street tacos.",
    address: "753 Main St. Anytown USA",
    score: 4.4,
    ratings: 65,
    image: "https://source.unsplash.com/480x300/?restaurant&random=11",
  },
  {
    id: "12",
    name: "The Ice Cream Parlor",
    description: "A family-friendly restaurant with a wide variety of ice cream flavors.",
    address: "852 Oak Ave. Anytown USA",
    score: 4.9,
    ratings: 150,
    image: "https://source.unsplash.com/480x300/?restaurant&random=12",
  },
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const api = {
  listStatic: async (): Promise<Restaurant[]> => {
    await sleep(750);

    return restaurants;
  },
  list: async (): Promise<Restaurant[]> => {
    const [, ...data] = await fetch ('https://docs.google.com/spreadsheets/d/e/2PACX-1vQf3lrPHNY3dHihVl2dnY5xFymhmqkU1g2OTchv_g12IiMYARPhd3IFRyilhDscK47Yh3q5wb6U_tv4/pub?gid=0&single=true&output=csv').then(res => res.text()).then(text => text.split('\n'))
    // Convertimos cada línea en un objeto Restaurant, asegúrate de que los campos no posean `,`
    const restaurants: Restaurant[] = data.map((row) => {
      const [id, name, description, address, score, ratings, image] = row.split(',')
      return {
        id,
        name,
        description,
        address,
        score: Number(score),
        ratings: Number(ratings),
        image
      }
    })
    // Lo retornamos
    return restaurants;
  },
  fetchStatic: async (id: Restaurant["id"]): Promise<Restaurant> => {
    await sleep(750);

    const restaurant = restaurants.find((restaurant) => restaurant.id === id);

    if (!restaurant) {
      throw new Error(`Restaurant with id ${id} not found`);
    }

    return restaurant;
  },
  fetch: async (id: Restaurant["id"]): Promise<Restaurant> => {
    const [, ...data] = await fetch ('https://docs.google.com/spreadsheets/d/e/2PACX-1vQf3lrPHNY3dHihVl2dnY5xFymhmqkU1g2OTchv_g12IiMYARPhd3IFRyilhDscK47Yh3q5wb6U_tv4/pub?gid=0&single=true&output=csv', { cache: 'no-store' }).then(res => res.text()).then(text => text.split('\n'))
    // Convertimos cada línea en un objeto Restaurant, asegúrate de que los campos no posean `,`
    const restaurants: Restaurant[] = data.map((row) => {
      const [id, name, description, address, score, ratings, image] = row.split(',')
      return {
        id,
        name,
        description,
        address,
        score: Number(score),
        ratings: Number(ratings),
        image
      }
    })
    const restaurant = restaurants.find((restaurant) => restaurant.id === id);

    if (!restaurant) {
      throw new Error(`Restaurant with id ${id} not found`);
    }

    return restaurant;
  },
  search: async (query: string): Promise<Restaurant[]> => {

    // si query está vacío, retornamos todos los restaurantes
    if (!query) {
      return api.list();
    }

    // Obtenemos los restaurantes
    const results = await api.list().then((restaurants) =>
      // Los filtramos por nombre
      restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(query.toLowerCase()),
      ),
    );

    // Los retornamos
    return results;
  },
};

export default api;
