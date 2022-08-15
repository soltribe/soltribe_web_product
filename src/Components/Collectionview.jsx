import React from 'react';
import '../Styles/Collectionview.css';
import sample from '../Assets/sample.jpg';

const Collectionview = () => {
    return (
        <div className="collection__view">
            <div className='cover__art__bg'>
                <img src={sample} className='collection_bg'alt='sample-cover-art'/>
                <div className='collection__title '>
                   <h1 style={{fontSize:'60px'}}>Collection Title</h1>
                   <p style={{fontSize:'40px'}}>Username</p>
                </div>
            </div>

            <div className="collection__content__list">
                <div className="collection__content">
                    <div className="each__content">
                        <p>File Preview</p>
                        <p>File Category</p>
                        <p>Date Created</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Collectionview;