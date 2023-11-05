import { ReactNode } from 'react';

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  children: ReactNode;
  disabled?: boolean;
}

export function Button({ onClick, children, disabled }: ButtonProps) {
  return (
    <button
      className="px-4 py-2 border-2 border-red-800 bg-red-100 hover:bg-red-400 active:bg-red-900 disabled:bg-gray-100"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  disabled: false,
};
