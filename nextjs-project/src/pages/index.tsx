// import Image from 'next/image';
// import { Inter } from 'next/font/google';
import Main from '@/components/Main';
import { type ResponseData } from '@/data/types';
import { createRequest } from '@/utils/createRequest';
import { QueryStatus } from '@reduxjs/toolkit/query';
import { getCards, getRunningQueriesThunk } from './api/rickAndMortyAPI';
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
    const storeData = store.getState().api.queries[req];

    const status = storeData?.status ?? null;
    const response: ResponseData | null = storeData?.data ?? null;
    return {
      props: { status, response },
    };
  }
);

export default function Home({
  status,
  response,
}: {
  status?: QueryStatus | null;
  response: ResponseData | null;
}) {
  let data: ResponseData = response ?? {};

  if (status === QueryStatus.rejected) {
    data = {};
  }

  return (
    <Layout>
      <Main data={data} />
    </Layout>
  );
}
