import React from 'react';
import PropTypes from 'prop-types';
import './elements.css'
import PokemonIcon from './PokemonIcon';
import { Link } from 'react-router-dom';

const TeamCard = props => {
    const {team} = props
    const pokemonRender = team?.pokemon?.map(pokemon=> {
        return (
            <PokemonIcon pokemon={pokemon}/>
        )
    })
    const emptySlots = new Array(6 - team?.pokemon.length).fill(' ').map(el=> {
        return (
            <div className="emptyslot">
                <i className='fal fa-plus'></i>
            </div>
        )
    })
    return (
        <div className='teamcard'>
            <div className="flexrow sb ac">
                <div>
                    <Link to={''}>
                    {team?.teamName}
                    </Link>
                </div>
                <i className='appicon fal fa-edit'></i>
            </div>
            <div className="pokemongrid">
                {pokemonRender}
                {emptySlots}
            </div>
        </div>
    );
};

TeamCard.propTypes = {
    
};

export default TeamCard;