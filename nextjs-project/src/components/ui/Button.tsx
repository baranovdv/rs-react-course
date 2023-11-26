import { type FC, type ReactNode } from 'react';

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  children: ReactNode;
  testId?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button: FC<ButtonProps> = ({
  onClick,
  children,
  testId = '',
  disabled = false,
  type = 'button',
}) => {
  return (
    <button
      className="px-4 py-2 border-2 border-red-800 bg-red-100 hover:bg-red-400 active:bg-red-900 disabled:bg-gray-100"
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
      type={type}
    >
      {children}
    </button>
  );
};

export { Button };
