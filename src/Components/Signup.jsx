import React, {useRef, useState} from 'react';
import '../Styles/Signup.css';
import Header from './Header';
import logo from '../Assets/solomon.png';
import { Link } from "react-router-dom";
import {FiUpload } from 'react-icons/fi';

const Signup = (props) => {
    const hiddenFileInput = useRef(null);
    const [username, setUserName] = useState('');
    const [descriptiontext, setDescriptionText] = useState('');
    const [file, setFile] = useState();
    const [profile, setProfile] = useState(true);
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const handleChange = (e) => {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
        setProfile(false);
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
                                  <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{display:'none'}} />
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
                    <button className='create__btn' onClick = {createAccount}>Create Account</button>
                </div>
            </div>
        </div>
    )
}

export default Signup;