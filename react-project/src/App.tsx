import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

function App() {
  return (
    <section className="grid grid-rows-[auto_1fr_auto] bg-slate-100 h-screen">
      <ErrorBoundary>
        <Header />
        <Outlet />
        <Footer />
      </ErrorBoundary>
    </section>
  );
}

export default App;
