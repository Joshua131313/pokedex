import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TeamCard from './elements/TeamCard';
import './TeamBuilder.css'
import { StoreContext } from '../../../../../../ContextAPI';
import useGetTeams from '../../../../../services/GetTeams';

const TeamsRender = props => {
    const {teams} = useContext(StoreContext)
    // const [teams, setTeams] = useGetTeams()
    const teamsRender = teams?.map(team=> {
        return (
            <TeamCard team={team} />   
        )
    })
    
    return (
        <div className='teamslist'>

            <div className="teamsrender flexwrap">
                {teamsRender}
            </div>
        </div>
    );
};

TeamsRender.propTypes = {
    
};

export default TeamsRender;