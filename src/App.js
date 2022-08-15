import React, {useMemo} from 'react';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    GlowWalletAdapter,
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import './App.css';
import Landing from './Components/Landing';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup';
import Collection from './Components/Collection';
import Profile from './Components/Profile';
import Collectionview from './Components/Collectionview';
import Collectioncreator from './Components/Collectioncreator';

// import the styles
require('@solana/wallet-adapter-react-ui/styles.css');

function App() {
  // you can use Mainnet, Devnet or Testnet here
  const solNetwork = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);
  // initialise all the wallets you want to use
  const wallets = useMemo(
      () => [
          new PhantomWalletAdapter(),
          new GlowWalletAdapter(),
          new SlopeWalletAdapter(),
          new SolflareWalletAdapter({ solNetwork }),
          new TorusWalletAdapter(),
          new LedgerWalletAdapter(),
          new SolletExtensionWalletAdapter(),
          new SolletWalletAdapter(),
      ],
      [solNetwork]
  );
  return (
    <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets}>
          <WalletModalProvider>
           <Router>
             <div>
               <Routes>
                 <Route path="/" element={<Landing/>}/>
                 <Route path="/signup" element={<Signup/>}/>
                 <Route path="/collection" element={<Collection/>}/>
                 <Route path="/profile" element={<Profile/>}/>
                 <Route path="/collectionview" element={<Collectionview/>}/>
                 <Route path="/collectioncreator" element={<Collectioncreator/>}/>
               </Routes>
              </div>
            </Router>
          </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
