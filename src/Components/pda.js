import {WebBundlr, Bundlr} from "@bundlr-network/client";
import * as fs from "fs";
import * as anchor from '@project-serum/anchor';
import { Solomon } from "../target/types/solomon";
//import * as spl from '@solana/spl-token';

export const ArtType = {
    Writing: 1,
    Video: 2,
    Music: 3,
    Painting: 4,
    Design: 5,
    Photography: 6,
    Adult: 7,
};

/*
const initialiseBundlr = async () => {
    const provider = new providers.Web3Provider(window.ethereum as any);
    await provider._ready();
    const bundlr = new WebBundlr(
        "https://devnet.bundlr.network",
        "matic",
        provider,
        {
            providerUrl:
                process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL,
        }
    );
    await bundlr.ready();
    setBundlrInstance(bundlr);

}*/

export const createBundlr = async (provider) => {
    const bundlr = new WebBundlr(
        "https://devnet.bundlr.network",
        "solana",
        provider,
        {
            providerUrl: "https://api.devnet.solana.com"
        }
    );
    await bundlr.ready();
}


export const createNewBundlrInstance = async () => {
    const jwk = JSON.parse(fs.readFileSync("tests/keypairs/solana.json").toString());
    const bundlr = new Bundlr("https://devnet.bundlr.network", "solana", jwk, { providerUrl: "https://api.devnet.solana.com" });
    console.log("Created new Bundlr instance");
    let response = await bundlr.fund(100_000_000);
    console.log("Funded bundlr wallet with 100_000_000 units");
    let balance = await bundlr.getBalance(bundlr.address);
    console.log("Bundlr balance: ", balance.toNumber());
    return bundlr;
}

export const createBundlrFromSecretKey = async (secretKey) => {
    const bundlr = new Bundlr("https://devnet.bundlr.network", "solana", secretKey, { providerUrl: "https://api.devnet.solana.com" });
    console.log("Created new Bundlr instance");
    let response = await bundlr.fund(100_000_000);
    console.log("Funded bundlr wallet with 100_000_000 units");
    return bundlr;
}

export const generateCreatorPDA = async (program, creator) => {
    let [pda, bump] = await anchor.web3.PublicKey.findProgramAddress([Buffer.from(anchor.utils.bytes.utf8.encode("creator")),
        creator.toBuffer()], program.programId);

    return [pda, bump];
}

export const generateCollectionPDA = async (program, creator, id) => {
    let [pda, bump] = await anchor.web3.PublicKey.findProgramAddress([Buffer.from(anchor.utils.bytes.utf8.encode("collection")),
        creator.toBuffer(), new anchor.BN(id).toBuffer('le', 8)], program.programId);

    return [pda, bump];
}

export const generatePaymentVaultPDA = async (program, collection) => {
    let [pda, bump] = await anchor.web3.PublicKey.findProgramAddress([Buffer.from(anchor.utils.bytes.utf8.encode("vault")),
        collection.toBuffer()], program.programId);

    return [pda, bump];
}

export const generateContentPDA = async(program, id , collection) => {
    let [pda, bump] = await anchor.web3.PublicKey.findProgramAddress([Buffer.from(anchor.utils.bytes.utf8.encode("content")),
        collection.toBuffer(), new anchor.BN(id).toBuffer('le', 8)], program.programId);

    return [pda, bump];
}

export const generateNftInfoPDA = async(program, collection) => {
    let [pda, bump] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from(anchor.utils.bytes.utf8.encode("nft-info")), collection.toBuffer()],
        program.programId
    )
    return [pda, bump];
}


export const createMetadataJson = (name, symbol, link, description) => {
    let json = `{
        "name": "${name}",
        "symbol": "${symbol}",
        "description": "${description}",
        "seller_fee_basis_points": 1,
        "external_url": "",
        "edition": "",
        "background_color": "000000",
        "image": "${link}"
    }`;

    return JSON.stringify(json);
};