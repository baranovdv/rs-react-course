import { Component } from 'react';
import SpinnerSvg from '../assets/img/Spinner.svg';

export class Spinner extends Component {
  render() {
    return (
      <img
        className="w-[10%] h-[10%] mx-auto animate-spin"
        src={SpinnerSvg}
        alt="Spinner"
      />
    );
  }
}
