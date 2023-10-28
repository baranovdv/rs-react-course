import { Component } from 'react';
import GH_Logo from '../assets/img/github-mark-white.svg';
import RS_Logo from '../assets/img/rs_school_js.svg';

export class Footer extends Component {
  render() {
    return (
      <footer className="flex justify-between w-full h-[50px] px-8 py-3 bg-slate-500">
        <a href="https://github.com/baranovdv/">
          <img src={GH_Logo} alt="GH Logo" className="h-full" />
        </a>
        <a href="https://rs.school/react/">
          <img src={RS_Logo} alt="RS Logo" className="h-full" />
        </a>
      </footer>
    );
  }
}
