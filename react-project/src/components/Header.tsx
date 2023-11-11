import { FC } from 'react';
import Logo from '../assets/img/Rick_and_Morty.png';

const Header: FC = () => {
  return (
    <header className="flex justify-center h-[80px] py-4 bg-slate-500">
      <h1>Hello World</h1>
      <img src={Logo} alt="Logo" />
    </header>
  );
};

export { Header };
