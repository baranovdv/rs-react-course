import { ErrorBoundary } from './components/ErrorBoundary';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Main } from './components/Main';

function App() {
  return (
    <section className="grid grid-rows-[auto_1fr_auto] bg-slate-100 h-screen">
      <ErrorBoundary>
        <Header />
        <Main />
        <Footer />
      </ErrorBoundary>
    </section>
  );
}

export default App;
