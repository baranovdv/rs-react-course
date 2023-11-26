import Image from 'next/image';
import type { FC } from 'react';
import Logo from '../assets/img/Rick_and_Morty.png';

const Header: FC = () => {
  return (
    <header className="flex relative justify-center h-[80px] py-4 bg-slate-500">
      <div className="relative w-[200px] aspect-square m-2">
        <Image
          src={Logo}
          alt="Logo"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          fill
          priority
        />
      </div>
    </header>
  );
};

export { Header };
