import React from "react";

const Dashboard = React.lazy(() => import("./pages/dashboard/Dashboard"));
const PokemonDetails = React.lazy(() =>
  import("./pages/pokemons/PokemonDetails")
);
const AccountInfo = React.lazy(() => import("./pages/account/accountInfo"));

const Nfts = React.lazy(() => import("./pages/my-wallet/Nfts"));
const Withdraw = React.lazy(() => import("./pages/my-wallet/Withdraw"));

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
  {
    path: "/wallet",
    exact: true, 
    name: "wallet",
    component: Nfts,
  },
  {
    path: '/wallet/withdraw', 
    exact: true, 
    name: 'withdraw', 
    component: Withdraw
  }
];

export default routes;
