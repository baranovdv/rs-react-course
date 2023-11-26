// import Image from 'next/image';
// import { Inter } from 'next/font/google';
import Main from '@/components/Main';
import { type ResponseData } from '@/data/types';
import { createRequest } from '@/utils/createRequest';
import { type QueryStatus } from '@reduxjs/toolkit/query';
import { useRouter } from 'next/router';
import {
  getCards,
  getRunningQueriesThunk,
  useGetCardsQuery,
} from './api/rickAndMortyAPI';
import { wrapper } from './api/store';

import Layout from './layout';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const request = createRequest(context.query);
    if (typeof request === 'string') {
      await store.dispatch(getCards.initiate(request));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    const req = `getCards("${request}")`;
    const status = store.getState().api.queries[req]?.status ?? null;
    return {
      props: { status },
    };
  }
);

export default function Home({ status }: { status: QueryStatus | null }) {
  const router = useRouter();

  const request = createRequest(router.query);
  const result = useGetCardsQuery(request);
  let data: ResponseData = result?.data ?? {};

  if (status === 'rejected') {
    data = {};
  }

  return (
    <Layout>
      <Main data={data} />
    </Layout>
  );
}
