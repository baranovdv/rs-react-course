import Logo from '../assets/img/Rick_and_Morty.png';

export function Header() {
  return (
    <header className="flex justify-center h-[80px] py-4 bg-slate-500">
      <img src={Logo} alt="Logo" />
    </header>
  );
}
