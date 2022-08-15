import React from 'react';
import logo from '../Assets/solomon.png';
import { Link } from "react-router-dom";
import '../Styles/Header.css';
// import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
// import { useConnection, useWallet } from '@solana/wallet-adapter-react';

const Header = () => {
    // const { connection } = useConnection();
    // const { publicKey, sendTransaction } = useWallet();
    // const { setVisible } = useWalletModal();
    return (
        <div className="header__section">
            <div className='header__logo'>
                <span><img src={logo} style={{fontSize:'20px',height:'45px',marginTop:'25px',borderRadius:'15px',}} alt="solomon-logo"/></span>
                <Link to="/" style={{textDecoration:'none', outline:'none',}}><h1 style={{color:'white',paddingLeft:'10px', paddingTop:'8px', cursor:'pointer',}} className='header-text'>Soltribe</h1></Link>
            </div>

            <div>
                <nav className='nav__links'>
                    <ul style={{color:'white', fontSize:'20px'}}>Marketplace</ul>
                    <ul style={{color:'white', fontSize:'20px'}}>Creators</ul>
                    <Link to="/profile" style={{textDecoration:'none', outline:'none',}}><ul style={{color:'white', fontSize:'20px'}}>Your Profile</ul></Link>
                </nav>
            </div>

            <div className='group__btn'>
                <WalletMultiButton />
                <Link to="/signup" style={{textDecoration:'none', outline:'none',}}><button className='sign__up'>Start Creating</button></Link>
            </div>
        </div>
    )
}

export default Header;