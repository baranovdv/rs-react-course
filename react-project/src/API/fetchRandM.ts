import { ResponseData, ResultData } from '../data/types';
import { COMMON_DATA } from '../data/data';

interface fetchPageProps {
  query: string;
  pageNum: number;
}

interface fetchDetailsProps {
  id: number;
}

export async function fetchPage({
  query,
  pageNum,
}: fetchPageProps): Promise<ResponseData> {
  const q = `?page=${pageNum}${query !== undefined ? '&name=' + query : ''}`;
  const response = await fetch(COMMON_DATA.APIurl + q);
  const data: ResponseData = await response.json();

  return data;
}
export async function fetchDetails({
  id,
}: fetchDetailsProps): Promise<ResultData> {
  const response = await fetch(COMMON_DATA.APIurl + id.toString());
  const data: ResultData = await response.json();

  return data;
}

//   convertToTableRow = (result: ResultData): TableRow => {
//     let description = `${result.status !== 'unknown' ? result.status : ''}
//     ${result.gender !== 'unknown' ? result.gender.toLowerCase() : ''} ${
//       result.species !== 'unknown' ? result.species.toLowerCase() : ''
//     } from ${result.location.name}`.trim();
//     description = description[0].toUpperCase() + description.slice(1);
//     return {
//       id: result.id,
//       name: result.name,
//       description: description,
//     };
//   };

//   fetchData = (query?: string | undefined): void => {
//     this.setState({
//       status: 'wait',
//     });
//     const q = query !== undefined ? '?name=' + query : '';
//     fetch(COMMON_DATA.APIurl + q)
//       .then((response) => response.json())
//       .then((data: ResponseData) => {
//         if (data.error) {
//           throw new Error(data.error);
//         }
//         const tableData = data.results?.map((item) =>
//           this.convertToTableRow(item)
//         );
//         this.setState({
//           tableContent: tableData,
//           status: 'idle',
//         });
//         localStorage.setItem(COMMON_DATA.localStorageQuery, query || '');
//       })
//       .catch((e: Error) => {
//         this.setState({
//           status: 'error',
//           error: e.message,
//         });
//       });
//   };
