import React, {useRef, useState} from 'react';
import '../Styles/Collection.css';
import Header from './Header';
import { BsCardImage } from 'react-icons/bs';

const Collection = (props) => {
    const hiddenFileInput = useRef(null);
    const [file, setFile] = useState();
    const [prev, setPrev] = useState(true);
    const handleChange = (e) => {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
        setPrev(false);
    }
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    return (
        <div className='collection__page'>
            <Header/>
            <div className='collection__creation__section'>
                <h2 style={{color:'white',}}>Create new item</h2>
                <p style={{color:'white',}}>File type supported: JPG, PNG</p>
                <div className='img' onClick={handleClick}>
                    {
                        prev ? (
                            <>
                              <span><BsCardImage style={{width:'80px', height:'80px', color:'white'}}/></span>
                              <p>Upload your cover art</p>
                              <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{display:'none'}} />
                            </>
                        ) : (
                            <><img src={file} alt='preview'/></>
                        )
                    }
                </div>
                <div>
                    <p style={{textAlign:'left', paddingLeft:'20px', color:'white',}}>Title<span style={{color:'red'}}>*</span></p>
                    <input type='text' className='collect__title' placeholder='Fill your collection tItle'/>
                    <div className='add__btn__section'>
                        <button className='add__btn__item'>Create Collection</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Collection;