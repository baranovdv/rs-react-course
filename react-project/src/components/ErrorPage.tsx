import { ERROR_DATA } from '../data/data';

export default function ErrorPage() {
  return (
    <div className="text-center mt-10 text-4xl">
      {ERROR_DATA.errorPageMessage}
    </div>
  );
}
