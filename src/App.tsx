import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

function App() {
  return (
    <section className="grid grid-rows-[auto_1fr_auto] bg-slate-300 h-screen">
      <Header />
      <Outlet />
      <Footer />
    </section>
  );
}

export default App;
