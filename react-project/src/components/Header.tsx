import { Component } from 'react';
import Logo from '../assets/img/Rick_and_Morty.png';

export class Header extends Component {
  render() {
    return (
      <header className="flex justify-center h-[80px] py-4 bg-slate-500">
        <img src={Logo} alt="Logo" />
      </header>
    );
  }
}
