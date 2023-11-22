import { NUM_OF_API_ITEMS } from '../../data/data';
import { selectItemsOnPage, selectSearchQuery } from '../../store/cardsSlice';
import { useAppSelector } from '../../store/hooks';

const useCreateRequest = (page: number) => {
  const itemsOnPage = useAppSelector(selectItemsOnPage);
  const searchQuery = useAppSelector(selectSearchQuery);

  const pageNum = Math.ceil((page * itemsOnPage) / NUM_OF_API_ITEMS);

  const request = `?page=${pageNum}${
    searchQuery !== undefined ? '&name=' + searchQuery : ''
  }`;

  return request;
};

export { useCreateRequest };
