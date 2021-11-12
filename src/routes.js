import React from "react";

const DepositFiat = React.lazy(() => import("./pages/deposit-fiat/DepositFiat"));
const Dashboard = React.lazy(() => import("./pages/dashboard/Dashboard"));
const PokemonDetails = React.lazy(() =>
  import("./pages/pokemons/PokemonDetails")
);
const AccountInfo = React.lazy(() => import("./pages/account/accountInfo"));

const Nfts = React.lazy(() => import("./pages/my-wallet/Nfts"));
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
    name: "wallet",
    component: Nfts,
  },
  {
    path: "/deposit-fiat",
    name: "deposit-fiat",
    component: DepositFiat,
  },
];

export default routes;
