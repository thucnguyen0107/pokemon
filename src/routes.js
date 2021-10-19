import React from "react";

const Dashboard = React.lazy(() => import("./pages/dashboard/Dashboard"));
const PokemonDetails = React.lazy(() =>
  import("./pages/pokemons/PokemonDetails")
);

const routes = [
  { path: "/", exact: true, name: "Pokemon" },
  { path: "/dashboard", name: "Trang chủ", component: Dashboard },
  {
    path: "/pokemon/:id",
    name: "details",
    component: PokemonDetails,
  },
];

export default routes;
