import { type ResultData } from '@/data/types';
import { useRouter } from 'next/router';
import { COMMON_DATA, TEST_DATA } from '../data/data';
import { Details } from './Details';
import { Button } from './ui/Button';

const Aside = ({ data }: { data: ResultData | null }) => {
  const router = useRouter();

  const handleAsideClose = () => {
    router.back();
  };

  return (
    <>
      <div
        onClick={handleAsideClose}
        className="fixed bg-black/20 top-0 right-0 left-0 bottom-0 z-10"
      ></div>

      <aside className="w-[320px] h-full fixed top-0 right-0 py-10 px-5 bg-white/95 z-20 lg:w-[30%]">
        {data === null ? (
          <div>{COMMON_DATA.notFound}</div>
        ) : (
          <Details data={data} />
        )}
      </aside>

      <div className="fixed top-5 right-5 z-20">
        <Button
          onClick={handleAsideClose}
          testId={TEST_DATA.ASIDE_BUTTON_CLOSE}
        >
          X
        </Button>
      </div>
    </>
  );
};

export { Aside };
