import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Main } from './components/Main';

function App() {
  return (
    <section className="grid grid-rows-[auto_1fr_auto] bg-slate-100 h-screen">
      <Header />
      <Main />
      <Footer />
    </section>
  );
}

export default App;
