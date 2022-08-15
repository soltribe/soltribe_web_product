import React from 'react';
import '../Styles/Mycollection.css';
import sample from '../Assets/sample.jpg';
import {FiEye} from 'react-icons/fi';
import {BsPlus} from 'react-icons/bs';
import { Link } from "react-router-dom";

const Mycollection = () => {
    return (
        <div className='collection__section'>
            <div className='created__collection'>
                <div className='created__image'>
                    <img src={sample} className="sample__img"  alt='sample'/>
                </div>
                <div className='collection_title'>
                    <p className='sample__title'>Sample Collection</p>
                    <p><span style={{paddingRight:'10px',}}><Link to="/collectioncreator" style={{textDecoration:'none', outline:'none',}}><BsPlus/></Link></span><Link to="/collectionview" style={{textDecoration:'none', outline:'none',}}><FiEye style={{paddingTop: '13px', paddingRight:'10px', textDecoration:'none', outline:'none',}}/></Link></p>
                </div>
            </div>
        </div>
    )
}

export default Mycollection;