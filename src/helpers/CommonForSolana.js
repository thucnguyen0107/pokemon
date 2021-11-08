import { Connection, programs } from "@metaplex/js";

let metaplexConnection = new Connection("devnet");
const tokenPublicKey = "CdX7qceVJUpnB1LECDRtatUUFYELVWfPWoGdq7thW7jJ";

export const run = async () => {
  try {
    // const storeId = await programs.metaplex.Store.getPDA(
    //   "3iTkX1oVLx2HqaNnLJdtX1v83Z1qauMVxFPfa2QCd2z7"
    // );
    // console.log("storeId: ", storeId);
    const ownedMetadata = await programs.metadata.Metadata.load(
      metaplexConnection,
      tokenPublicKey
    );
    console.log(ownedMetadata);
    // const store = await programs.metaplex.Store.load(metaplexConnection, storeId);
    // // Get all whitelisted creators
    // const creators = await store.getWhitelistedCreators(metaplexConnection);
    // console.log("creators: ", creators);
  } catch {
    console.log("Failed to fetch metadata");
  }
};
