import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogout } from '../../utils/DBFunctions';
import firebase from 'firebase';
import Button from '../Button/Button';

const AuthHandler = props => {
    const navigate = useNavigate()
    const user = firebase.auth().currentUser
    return (
        <>
            {
                user ? 
                <Link to='/' onClick={()=> handleLogout()}>
                    <Button text='Logout' />
                </Link>
                : 
                <Link to='/login'>
                    <Button text='Login'/>
                </Link>
            }
        </>
    );
};

AuthHandler.propTypes = {
    
};

export default AuthHandler;