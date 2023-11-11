import { createContext, useContext, useReducer } from 'react';
import { Action, Store } from '../data/interfaces';
import { initialStore } from './initialStore';
import { storeReducer } from './storeReducer';

const CONTEXT_ERROR = 'Context must be used inside Provider';

const StoreContext = createContext<Store | null>(null);
const StoreDispatchContext = createContext<React.Dispatch<Action> | null>(null);

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [store, dispatch] = useReducer(storeReducer, initialStore);

  return (
    <StoreContext.Provider value={store}>
      <StoreDispatchContext.Provider value={dispatch}>
        {children}
      </StoreDispatchContext.Provider>
    </StoreContext.Provider>
  );
};

const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw Error(CONTEXT_ERROR);
  }
  return context;
};

const useStoreDispatch = () => {
  const context = useContext(StoreDispatchContext);
  if (!context) {
    throw Error(CONTEXT_ERROR);
  }
  return context;
};

export { StoreProvider, useStore, useStoreDispatch, StoreContext };
