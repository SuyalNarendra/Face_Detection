import React from 'react';
import './form.css'

const ImageLinkForm = ({ onInputChange,onButtonSubmit }) => {
 return(
 	<div className='tc'>
            <p className='f3 b '>
               {'to detect a face,give it a try!!!!!!'}
           </p>
        <div className='center'>
             <div className='form center pa4 br3 shadow-5'>
              <input className='f3 pa1.5 w-70 ' type='text' onChange={onInputChange} />
              <button className='w-30 grow link f5 ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
             </div>  
        </div>
    </div>
  );
}
export default ImageLinkForm; 