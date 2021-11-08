import React from "react";

const Dashboard = React.lazy(() => import("./pages/dashboard/Dashboard"));
const PokemonDetails = React.lazy(() =>
  import("./pages/pokemons/PokemonDetails")
);
const AccountInfo = React.lazy(() => import("./pages/account/accountInfo"));

const routes = [
  { path: "/", exact: true, name: "Pokemon" },
  { path: "/dashboard", name: "Trang chủ", component: Dashboard },
  {
    path: "/pokemon/:id",
    name: "details",
    component: PokemonDetails,
  },
  {
    path: "/account",
    name: "account",
    component: AccountInfo,
  },
];

export default routes;
