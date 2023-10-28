export type TableRow = {
  id: number;
  name: string;
  description: string;
};

export type AppStatus = 'idle' | 'wait' | 'error';

export type ResultData = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: Record<'name' | 'url', string>;
  location: Record<'name' | 'url', string>;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type ResponseInfo = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export type ResponseData = {
  info: ResponseInfo;
  results: ResultData[];
};
