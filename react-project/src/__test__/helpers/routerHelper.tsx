import React, { FC } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { StoreProvider } from 'src/context/StoreContext';

interface routerHelperProps {
  children: React.ReactElement | null;
}

const routerHelper: FC<routerHelperProps> = ({ children }) => {
  return (
    <StoreProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </StoreProvider>
  );
};

export { routerHelper };
