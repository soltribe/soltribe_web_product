import React, {useRef, useState} from 'react';
import '../Styles/Collection.css';
import Header from './Header';
import { BsCardImage } from 'react-icons/bs';
import { RiArrowDropDownLine } from 'react-icons/ri'

const Collectioncreator = () => {
    const [categorymodal, setCategoryModal] = useState(false);
    const [categorytext, setCategoryText] = useState('Select Category');
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
    const openCategoryModal = () => {
        if (categorymodal === false) {
            setCategoryModal(true);
        } else {
            setCategoryModal(false);
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
                              <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{display:'none'}} />
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