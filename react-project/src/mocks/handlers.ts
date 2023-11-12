import { http, HttpResponse } from 'msw';
import { mockData, mockNotFound } from './mockData';

let isAPICalled: boolean = false;

const clearIsAPICalled = () => (isAPICalled = false);

const handlers = [
  http.get('https://rickandmortyapi.com/api/character/', ({ request }) => {
    isAPICalled = true;
    const url = new URL(request.url);
    const query = url.searchParams.get('name');

    if (query === 'errorQuery') return HttpResponse.json(mockNotFound);

    return HttpResponse.json(mockData);
  }),
  http.get('https://rickandmortyapi.com/api/character/:id', ({ params }) => {
    isAPICalled = true;
    const { id } = params;

    return HttpResponse.json(mockData.results[Number(id) - 1]);
  }),
];

export { handlers, isAPICalled, clearIsAPICalled };
