import React, {useRef, useState} from 'react';
import '../Styles/Signup.css';
import Header from './Header';
import logo from '../Assets/solomon.png';
import { Link } from "react-router-dom";
import {FiUpload } from 'react-icons/fi';
import {useConnection, useWallet} from '@solana/wallet-adapter-react';
import * as solanaWeb3 from '@solana/web3.js';
import idl from '../soltribe.json';
import {ProviderContext} from '../utils/provider';
import {
    generateCreatorPDA,

} from './pda';
import { useBundlr, uploadFile,  } from '../utils/bundlr';

const Signup = (props) => {
    const hiddenFileInput = useRef(null);
    const [username, setUserName] = useState('');
    const [descriptiontext, setDescriptionText] = useState('');
    const [file, setFile] = useState();
    const [profile, setProfile] = useState(true);
    const {initializeBundlr, uploadFile, bundlrInstance} = useBundlr();
    const [program , provider] = useContext(ProviderContext);
    const [CID, setCID] = useState('');
    const [URI, setURI] = useState('');

    function onFileChange(e) {
        const file = e.target.files[0];
        //console.log(e.target.files);
        if (file) {
            const image = URL.createObjectURL(file);
            setImage(image);
            let reader = new FileReader();
            reader.onload = function () {
                if(reader.result) {
                    setFile(Buffer.from(reader.result))
                }
            }
            reader.readAsArrayBuffer(file);
        }
        //What is this? setProfile(false);
    }

    const handleClick = event => {
        hiddenFileInput.current.click();
    };
   
    /// This uploads the file directly from the user to Arweave 
    /// uploadFile takes another argument which is the filetype(mp3, jpeg, mp4, etc).
    /// do you know how to retrieve that?

    const handleUpload = async() => {
        const res = await uploadFile(file);
        console.log('res.data: ', res.data);
        // The id of our uploaded content, the 3rd argument in the createAccount function
        // and gets stored on the blockchain
        setCID(`${res.data.id}`);
        // Location of the user's file on arweave, if you can do it fast put the link under
        // a big 'success!' icon on top to show that it was uploaded correctly.
        setURI(`http://arweave.net/${res.data.id}`);
    }
    
    async function createAccount() {
        const creator = provider.wallet.publicKey;
        const creatorAccount = generateCreatorPDA(program, creator);
        try {
            await program.methods
            .initCreator({username}, {descriptiontext}, CID)
            .accounts({
                creator: creator,
                creatorAccount: creatorAccount
            })
            .rpc();
        } catch(_err) {
            console.log(_err);
            // do something here
        }
    }

    return (
        <div className='signup_page'>
            <Header/>
            <div className='signup__main'>
                <span><img src={logo} style={{fontSize:'20px',height:'45px',marginTop:'25px',borderRadius:'15px',}} alt="solomon-logo"/></span>
                <h1 className='sign-text'>Sign Up as an Artist/Creator</h1>
                <p className='sign-descp'>Already an artist? <Link to="/collection" style={{textDecoration:'none', outline:'none',}}><span style={{color:'#3e00b3',}}>Create a collection</span></Link></p>
                <div className='sign__div'>
                    <div className='img__upload' onClick={handleClick}>
                        {
                            profile ? (
                                <>
                                  <FiUpload style={{position:'absolute', paddingBottom:'15px'}} className='file__uploader'/>
                                  <p style={{paddingTop:'13px'}}>Upload</p>
                                  <input type="file" ref={hiddenFileInput} onChange={onFileChange} style={{display:'none'}} />
                                </>
                            ) : (
                                <><img className='preview__img' src={file} alt='preview'/></>
                            )
                        }
                    </div>
                    <p style={{color:'white'}}>Set a Profile photo</p>
                    <input type='text'  className='input__user' value={username} onChange={(e) => setUserName(e.target.value)} placeholder='Enter a username'/>
                    <form class="my-form">
                       <textarea className="description-field" value={descriptiontext} onChange={(e) => setDescriptionText(e.target.value)} name="msg" rows="5" cols="50" placeholder="Tell us a little about yourself"></textarea>
                    </form>
                    <button className='create__btn' onClick={createAccount}>Create Account</button>
                </div>
            </div>
        </div>
    )
}

export default Signup;