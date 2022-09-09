import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css'
import mask from './mask.png';

const Logo = () => {
 return(
 	<div className='ma4 mt0'>
    <Tilt className="Tilt br2 shadow-2 " options={{ max : 52 }} style={{ height: 120, width: 120 }} >
    <div className="Tilt-inner"> <img alt='Mask' src={mask} /> </div>
    </Tilt>
     </div>
  );
}
export default Logo; 