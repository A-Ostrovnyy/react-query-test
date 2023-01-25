import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "../pages/Home/Home";
import SuperHeroesPage from "../pages/SuperHeroes/SuperHeroes";
import RQSuperHeroesPage from "../pages/RQSuperHeroes/RQSuperHeroes";
import RQSuperHeroPage from "../pages/RQSuperHero/RQSuperHero";
import ParallelQueriesPage from "../pages/ParallelQueries/ParallelQueries";
import DynamicParallelQueriesPage from "../pages/DynamicParallelQueries/DynamicParallelQueries";
import DependentQueryPage from "../pages/DependentQuery/DependentQuery";
import PaginatedQueriesPage from "../pages/PaginatedQueries/PaginatedQueries";
import InfiniteQueriesPage from "../pages/InfiniteQueries/InfiniteQueries";

const router = createBrowserRouter([
  {
    path: "/rq-infinite",
    element: <InfiniteQueriesPage />,
  },
  {
    path: "/rq-paginated",
    element: <PaginatedQueriesPage />,
  },
  {
    path: "/rq-dependent",
    element: <DependentQueryPage email='gmail@gmail.com' />,
  },
  {
    path: "/rq-parallel-dynamic",
    element: <DynamicParallelQueriesPage heroIds={[1, 3]} />,
  },
  {
    path: "/rq-parallel",
    element: <ParallelQueriesPage />,
  },
  {
    path: "/rq-super-hero/:heroId",
    element: <RQSuperHeroPage />,
  },
  {
    path: "/super-heroes",
    element: <SuperHeroesPage />,
  },
  {
    path: "/rq-super-heroes",
    element: <RQSuperHeroesPage />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
]);

export const PageRoutes = () => {
  return <RouterProvider router={router} />;
};
