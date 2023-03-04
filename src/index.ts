
import { Wallet, web3 } from "@coral-xyz/anchor";
import { CitrusSdk } from "@famousfoxfederation/citrus-sdk";

import bs58 from 'bs58'
const KEYPAIR_PRIVATE_KEY = bs58.decode(process.env.WALLET_PRIVATE_KEY as string)
// const KEYPAIR_PRIVATE_KEY = Buffer.from(JSON.parse(process.env.WALLET_SECRET_KEY as string))
const KEYPAIR = web3.Keypair.fromSecretKey(KEYPAIR_PRIVATE_KEY)
const wallet = new Wallet(KEYPAIR);
const RPC_ENDPOINT = process.env.RPC_ENDPOINT ?? 'http://localhost:8899';
const conn = new web3.Connection(RPC_ENDPOINT, { commitment: 'confirmed' });
const sdk = new CitrusSdk(wallet, conn);


async function main() {
  try {
    const collections = await sdk.fetchCollections();
    console.log(collections)
  } catch(e) {
    console.log(`EXCEPTION: ${e}`)
  }

}

main();