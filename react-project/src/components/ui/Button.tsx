import { Component, ReactNode } from 'react';

type ButtonProps = {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  children: ReactNode;
};

export class Button extends Component<ButtonProps> {
  render() {
    return (
      <button
        className="px-4 py-2 border-2 border-red-800 bg-red-100 hover:bg-red-400 active:bg-red-900"
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}
