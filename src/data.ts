import { TIngredient } from '@utils-types';
import { initialState } from './services/slices/burger';

export const data: Array<TIngredient> = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0943',
    name: 'Соус фирменный Space Sauce',
    type: 'sauce',
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
  }
];

export const bunIngredientToAdd = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  id: '',
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

export const mainIngredientToAdd = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  id: '3',
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

export const testInitialState = {
  ...initialState,
  ingredients: [
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      id: '1',
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      id: '0',
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
    }
  ]
};

export const testMoveBurgerState = {
  ...initialState,
  ingredients: [
    {
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      id: '0',
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      id: '1',
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    }
  ]
};

export const mockedPayload = {
  orders: [
    {
      _id: '676f9975750864001d37664e',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093d'
      ],
      owner: 'C4SZS7RIoNtOXPzyMSrd5',
      status: 'done',
      name: 'Флюоресцентный метеоритный бургер',
      createdAt: '2024-12-28T06:23:49.225Z',
      updatedAt: '2024-12-28T06:23:50.201Z',
      number: 64476
    }
  ]
};

export const mockedBurger = {
  order: [
    {
      _id: '676f9975750864001d37664e',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093d'
      ],
      owner: 'C4SZS7RIoNtOXPzyMSrd5',
      status: 'done',
      name: 'Флюоресцентный метеоритный бургер',
      createdAt: '2024-12-28T06:23:49.225Z',
      updatedAt: '2024-12-28T06:23:50.201Z',
      number: 64476
    }
  ]
};

export const mockedOrders = {
  payload: [
    {
      _id: '676a8b30750864001d373fe7',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный метеоритный бургер',
      createdAt: '2024-12-24T10:21:36.709Z',
      updatedAt: '2024-12-24T10:21:37.687Z',
      number: 63966
    },
    {
      _id: '676ac829750864001d3740f6',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный люминесцентный бургер',
      createdAt: '2024-12-24T14:41:45.115Z',
      updatedAt: '2024-12-24T14:41:45.995Z',
      number: 63997
    }
  ],
  meta: {
    requestId: 'zVvijVjq3kWDG4YCs4-Ck',
    requestStatus: 'fulfilled'
  }
};

export const mockedFeed = {
  orders: [
    {
      _id: '676ff220750864001d3766ea',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный бессмертный био-марсианский метеоритный бургер',
      createdAt: '2024-12-28T12:42:08.401Z',
      updatedAt: '2024-12-28T12:42:09.425Z',
      number: 64497
    },
    {
      _id: '676ec195750864001d3764e5',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный space био-марсианский люминесцентный бургер',
      createdAt: '2024-12-27T15:02:45.687Z',
      updatedAt: '2024-12-27T15:02:46.681Z',
      number: 64448
    }
  ],
  total: 64123,
  totalToday: 57
};

export const mockedUser = {
  user: {
    email: 'lennon@mail.ru',
    name: 'John Lennon'
  }
};

export const mockedUserRegister = {
  user: {
    email: 'lennon@mail.ru',
    name: 'John Lennon',
    password: '12345678'
  }
};

export const mockedUserLogin = {
  user: {
    email: 'lennon@mail.ru',
    password: '12345678'
  }
};
