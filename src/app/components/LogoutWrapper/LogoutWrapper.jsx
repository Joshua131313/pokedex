import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogout } from '../../utils/DBFunctions';

const LogoutWrapper = props => {
    const navigate = useNavigate()

    return (
        <Link to='/' onClick={()=> handleLogout()}>
            {props.children}
        </Link>
    );
};

LogoutWrapper.propTypes = {
    
};

export default LogoutWrapper;