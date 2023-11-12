import { FC, ReactNode } from 'react';

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  children: ReactNode;
  testId?: string;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  onClick,
  children,
  testId = '',
  disabled = false,
}) => {
  return (
    <button
      className="px-4 py-2 border-2 border-red-800 bg-red-100 hover:bg-red-400 active:bg-red-900 disabled:bg-gray-100"
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
    >
      {children}
    </button>
  );
};

export { Button };
