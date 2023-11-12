import { ResponseData, ResultData } from '../data/types';
import { COMMON_DATA } from '../data/data';

interface FetchPageProps {
  query: string;
  pageNum: number;
}

interface FetchDetailsProps {
  id: number;
}

const fetchPage = async ({
  query,
  pageNum,
}: FetchPageProps): Promise<ResponseData> => {
  const request = `?page=${pageNum}${
    query !== undefined ? '&name=' + query : ''
  }`;

  const response = await fetch(COMMON_DATA.APIurl + request);
  const data: ResponseData = await response.json();

  return data;
};
const fetchDetails = async ({ id }: FetchDetailsProps): Promise<ResultData> => {
  const response = await fetch(COMMON_DATA.APIurl + id.toString());
  const data: ResultData = await response.json();

  return data;
};

export { fetchPage, fetchDetails };
