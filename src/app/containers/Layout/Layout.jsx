import React from 'react';
import PropTypes from 'prop-types';
import './Layout.css'
import Button from '../../components/Button/Button';

const Layout = props => {
    const {title, className, btn} = props
    return (
        <div className={`${className} layout`}>
            <div className="layoutheader flexrow sb ac">
                <h2 className='layouttitle'>
                    {title}
                </h2>
                <Button text={btn.text} onClick={()=> btn.onClick()}/>
            </div>
            {props.children}
        </div>
    );
};

Layout.propTypes = {
    
};

export default Layout;