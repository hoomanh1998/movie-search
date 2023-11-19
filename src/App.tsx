import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "layouts/root-layout";
import Home from "@pages/home";
import Bookmarked from "@pages/bookmarked";
import MovieDetails from "@pages/movie-details";
import NotFound from "@pages/not-found";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index path="/" element={<Home />} />
      <Route path="/search" element={<Home />} />
      <Route path="/bookmarked-movies" element={<Bookmarked />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
