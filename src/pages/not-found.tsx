import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="relative flex flex-col w-full min-h-screen items-center justify-center text-white p-5">
    <h1 className="text-9xl">404</h1>
    <h2 className="text-4xl mb-10 text-center">Page Not Found!</h2>
    <Link className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-xl" to="/">
      Go Back to Home
    </Link>
  </div>
);

export default NotFound;
