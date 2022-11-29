import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { addPokemonToTeam } from '../../utils/DBFunctions';
import { StoreContext } from '../../../ContextAPI';
import useGetTeams from '../../services/GetTeams';

const AddPokemon = props => {
    const {teams, setTeams} = useContext(StoreContext)
    // const [teams, setTeams] = useGetTeams()
    const {pokemon, El= 'div', className, team} = props

    return (
        <El 
          className={className}
          onClick={()=>
            addPokemonToTeam(team, {
              pokemonId: pokemon.id,
              name: pokemon.name,
              imgs: pokemon.sprites,
              stats: pokemon.stats,
              types: pokemon.types,
              abilities: pokemon.abilities
            }, teams, (data)=> setTeams(data))} 
            >
            {props.children}
        </El>
    );
};

AddPokemon.propTypes = {
    
};

export default AddPokemon;