import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { db } from '../../Fire';
import firebase from 'firebase';
const useGetTeams = props => {
    const [teams, setTeams] = useState([])
    const user = firebase.auth().currentUser
 
    useEffect(()=> {
       user && db.collection('users').doc(user.uid).collection('teams').onSnapshot(snapshot=> {
            const teams = snapshot.docs.map(doc => doc.data())
            setTeams(teams)
        })
    }, [user])

    return [teams, setTeams]
};

useGetTeams.propTypes = {
    
};

export default useGetTeams;