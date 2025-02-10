import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
       
         <>
           <h2 style={{
            textAlign:"center",
            fontFamily:"sans-serif",
            fontSize:"2.3em",
            
           }}> 404 Page Not Found </h2> 
             <Link to="/" style={{
                textDecoration:"underline,2px,solid",
                textAlign:"center",
                display:"block",
                marginTop:"20px",
                color:"blue"
             }}>Back to home</Link>
         </>
       
        
    );
};

export default NotFound;