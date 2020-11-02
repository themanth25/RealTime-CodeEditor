import React from "react";

import LandingImage from '../../Assets/coding.gif';
import classes from './CoverImage.module.css';

const coverImage = (props) => {
    return (
        <div className={classes.Main}>
            <img className={classes.CoverImage} alt="CoverImage" src={LandingImage}/>
        </div>
    );
}

export default coverImage;