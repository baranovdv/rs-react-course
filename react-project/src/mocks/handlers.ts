import { http, HttpResponse } from 'msw';
import { mockData } from './mockData';

export const handlers = [
  http.get('https://rickandmortyapi.com/api/character/', () => {
    return HttpResponse.json(mockData);
  }),
];
