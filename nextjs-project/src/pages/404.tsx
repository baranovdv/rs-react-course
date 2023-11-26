import { type FC } from 'react';
import pic404 from '../assets/img/pic404.svg';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { TEST_DATA } from '@/data/data';
import Image from 'next/image';

const ERROR_PAGE_CONSTS = {
  TITLE: 'Error 404 page',
  SUBTITLE: 'NOT FOUND',
  BUTTON_LABEL: 'HOME',
};

const ErrorPage: FC = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-2xl text-center">{ERROR_PAGE_CONSTS.TITLE}</h1>
        <p>{ERROR_PAGE_CONSTS.SUBTITLE}</p>
        <Image
          className="w-[120px]"
          src={pic404}
          alt="404"
          data-testid={TEST_DATA.IMG_404}
        />
        <Link href="/" className="py-10">
          <Button onClick={() => {}}>{ERROR_PAGE_CONSTS.BUTTON_LABEL}</Button>
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
