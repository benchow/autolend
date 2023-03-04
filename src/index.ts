
import { Wallet, web3 } from "@coral-xyz/anchor";
import { PublicKey } from '@solana/web3.js'
import { CitrusSdk, Status } from "@famousfoxfederation/citrus-sdk";

import bs58 from 'bs58'
const KEYPAIR_PRIVATE_KEY = bs58.decode(process.env.WALLET_PRIVATE_KEY as string)
// const KEYPAIR_PRIVATE_KEY = Buffer.from(JSON.parse(process.env.WALLET_SECRET_KEY as string))
const KEYPAIR = web3.Keypair.fromSecretKey(KEYPAIR_PRIVATE_KEY)
const wallet = new Wallet(KEYPAIR);
const RPC_ENDPOINT = process.env.RPC_ENDPOINT ?? 'https://neat-hidden-sanctuary.solana-mainnet.discover.quiknode.pro/2af5315d336f9ae920028bbb90a73b724dc1bbed/';
const conn = new web3.Connection(RPC_ENDPOINT, { commitment: 'confirmed' });
const sdk = new CitrusSdk(wallet, conn);


async function main() {
  try {
    const collections = await sdk.fetchCollections();
    // console.log(collections)

    // collections sorted in place by ascending floor price
    // const collectionsSorted = collections.sort((a,b) => {
    //   const floorA = a.floor ?? 0
    //   const floorB  = b.floor ?? 0
    //   if (floorA > floorB) return 1
    //   if (floorA < floorB) return -1
    //   return 0
    // })
    const collectionsSorted = collections.sort((a,b) => {
      const availableA = a.loansAvailable ?? 0
      const availableB  = b.loansAvailable ?? 0
      if (availableA > availableB) return -1
      if (availableA < availableB) return 1
      return 0
    })
    // console.log(collectionsSorted)

    // const selectedCollection = collections.find( collection => collection.name.indexOf('Solana Monkey Business') >= 0) ?? collections[0]
    const selectedCollection = collections[0]
    console.log(selectedCollection)

    const loans = await sdk.fetchCollectionLoans(new PublicKey(selectedCollection.id));
    // const loans = await sdk.fetchCollectionLoans(new PublicKey(selectedCollection.id), Status.WaitingForLender);
    console.log(loans)

  } catch(e) {
    console.log(`EXCEPTION: ${e}`)
  }

}

main();