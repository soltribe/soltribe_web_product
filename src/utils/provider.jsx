import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { useWallet, WalletProvider, ConnectionProvider} from '@solana/wallet-adapter-react';
import {Program,  Provider, web3} from '@project-serum/anchor';
import idl from '../soltribe.json';
import React, { useEffect, useState } from 'react';

const programID = new PublicKey(idl.metadata.address);
const network = clusterApiUrl('devnet');
const opts = {
    preflightCommitment: 'processed'
};

export const ProviderContext = React.createContext();

const ConnectionProvider = (children) => {
    const [provider, setProvider] = useState(null);
    const [program, setProgram] = useState(null);
    useEffect(() => {
        console.log("Running effect...");
        const wallet = useWallet();
        const connection = new Connection(network, opts.preflightCommitment);
        const provider = new Provider(connection, wallet, opts.preflightCommitment);
        const program = new Program(idl, programID, provider);
        setProvider(provider);
        setProgram(program);
    }, [wallet])
    console.log(provider, program);
    return (
        <ProviderContext.Provider value={ { provider, program } }>
            {children}
        </ProviderContext.Provider>    
    );
}

export default getProvider;