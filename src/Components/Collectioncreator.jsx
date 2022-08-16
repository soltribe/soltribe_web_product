import React, {useRef, useState} from 'react';
import '../Styles/Collection.css';
import Header from './Header';
import { BsCardImage } from 'react-icons/bs';
import { RiArrowDropDownLine } from 'react-icons/ri';
import {ProviderContext} from '../utils/provider';
import {generateCollectionPDA, generatePaymentVaultPDA} from './pda';
import {publicKey} from '@solana/web3.js';

const Collectioncreator = () => {
    const [categorymodal, setCategoryModal] = useState(false);
    const [categorytext, setCategoryText] = useState('Select Category');
    const hiddenFileInput = useRef(null);
    const [file, setFile] = useState();
    const [prev, setPrev] = useState(true);
    const [CID, setCID] = useState('');
    const [URI, setURI] = useState('');
    const [filetype, setFileType] = useState('');

    /*
    const handleChange = (e) => {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
        setPrev(false);
    }*/
    
    const handleChange = (e) => {
        const file = e.target.files[0];
        //console.log(e.target.files);
        if (file) {
            const image = URL.createObjectURL(file);
            setFileType(file.type);
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

    const openCategoryModal = () => {
        if (categorymodal === false) {
            setCategoryModal(true);
        } else {
            setCategoryModal(false);
        }
    }

    /// This uploads the file directly from the user to Arweave 
    /// uploadFile takes another argument which is the filetype(mp3, jpeg, mp4, etc).
    /// do you know how to retrieve that?

    const handleUpload = async() => {
        const res = await uploadFile(file, filetype);
        console.log('res.data: ', res.data);
        // The id of our uploaded content, the 3rd argument in the createAccount function
        // and gets stored on the blockchain
        setCID(`${res.data.id}`);
        // Location of the user's file on arweave, if you can do it fast put the link under
        // a big 'success!' icon on top to show that it was uploaded correctly.
        setURI(`http://arweave.net/${res.data.id}`);
    }
    
    async function createCollection() {
        const creator = provider.wallet.publicKey;
        const creatorAccount = generateCreatorPDA(program, creator);

        const creatorAccountState = await program.account.creator.fetch(creatorAccount);
        const collectionId = (creatorAccountState.collections) + 1;
        const collectionPDA = generateCollectionPDA(program, creator, collectionId);

        const vaultPDA = generatePaymentVaultPDA(program, collectionPDA);
        const wrappedSol = new publicKey("So11111111111111111111111111111111111111112");

        try {
            await program.methods
              .initCollection(collectionTitle, collectionType, CID)
              .accounts({
                creator: creator1.publicKey,
                creatorAccount: creatorAccount1,
                collection: collectionPDA,
                paymentVault: vaultPDA,
                mint: wrappedSol,
              })
              .signers([creator1])
              .rpc();
        } catch(_err) {
            console.log(_err);
            // do something here
        }
    }

    return (
        <div className='collection__page'>
            <Header/>
            <div className='collection__creation__section'>
                <h2 style={{color:'white',}}>Create Content</h2>
                <p style={{color:'white',}}>File type supported: JPG, PNG, MP3</p>
                <div className='img' onClick={handleClick}>
                    {
                        prev ? (
                            <>
                              <span><BsCardImage style={{width:'80px', height:'80px', color:'white'}}/></span>
                              <p>Upload your file</p>
                              <input type="file" ref={hiddenFileInput} onChange={handleChange} accept="image/*,audio/*,video/*" style={{display:'none'}} />
                            </>
                        ) : (
                            <><img src={file} alt='preview'/></>
                        )
                    }
                </div>
                <div>
                    <p style={{textAlign:'left', paddingLeft:'20px', color:'white',}}>Categories</p>
                    <div onClick={openCategoryModal}>
                        <p className='catergory__default'><span style={{paddingLeft:'18px', paddingTop:'3px', fontWeight:'600'}}>{categorytext}</span>  <span style={{paddingRight:'10px', paddingTop:'3px', fontWeight:'600', fontSize:'20px'}}><RiArrowDropDownLine/></span></p>
                    </div>
                    <div className='add__btn__section'>
                        <button className='add__btn__item'>Add Content</button>
                    </div>
                </div>
            </div>
            {
                categorymodal && (
                    <div className='category__modal'>
                        <p style={{marginTop:'8px'}}   onClick={() => [setCategoryText('Picture'), setCategoryModal(false)]}>Picture</p>
                        <p style={{marginTop:'-15px'}} onClick={() => [setCategoryText('Video'), setCategoryModal(false)]}>Video</p>
                        <p style={{marginTop:'-15px'}} onClick={() => [setCategoryText('Music'), setCategoryModal(false)]}>Music</p>
                    </div>
                )
            }
        </div>
    )
}

export default Collectioncreator;