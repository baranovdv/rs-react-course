import { createContext, useState } from 'react';
import { IContentContext } from '../data/interfaces';
import { ResultData } from '../data/types';

const ContentContext = createContext<IContentContext>({
  content: null,
  updateContent: () => {},
});

const ContentState = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState<ResultData[] | null>(null);

  const updateContent = (array: ResultData[] | null) => setContent(array);

  return (
    <ContentContext.Provider value={{ content, updateContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export { ContentContext, ContentState };
