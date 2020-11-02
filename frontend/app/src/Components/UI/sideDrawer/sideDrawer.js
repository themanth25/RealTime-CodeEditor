import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faCode } from '@fortawesome/free-solid-svg-icons'
import classes from './sideDrawer.module.css';

const sideDrawer = (props) => {
    return (
        <div className={classes.SideDrawer}>
            <button className={classes.ButtonIcon} onClick={props.click}><FontAwesomeIcon icon={faShareAlt} /></button>
            <button className={classes.ButtonIcon} onClick={props.click}><FontAwesomeIcon icon={faCode} /></button>
        </div>
    );
}

export default sideDrawer;