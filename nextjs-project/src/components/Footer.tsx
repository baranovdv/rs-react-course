import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import GH_Logo from '../assets/img/github-mark-white.svg';
import RS_Logo from '../assets/img/rs_school_js.svg';

const Footer: FC = () => {
  return (
    <footer className="flex relative justify-between w-full h-[50px] px-8 py-3 bg-slate-500">
      <Link href="https://github.com/baranovdv/">
        <Image src={GH_Logo} alt="GH Logo" className="h-full w-[26px]" />
      </Link>
      <Link href="https://rs.school/react/">
        <Image src={RS_Logo} alt="RS Logo" className="h-full w-[60px]" />
      </Link>
    </footer>
  );
};
export { Footer };
