import React from 'react';
import PropTypes from 'prop-types';
import ImgLoaded from '../../../../../../components/Imgloaded/Imgloaded';

const PokemonIcon = props => {
    const {pokemon} = props
    return (
        <div className='pokemonicon flexcol'>
            <ImgLoaded img={pokemon?.sprites.other.home.front_default} />
            <span>{pokemon?.name}</span>
        </div>
    );
};

PokemonIcon.propTypes = {
    
};

export default PokemonIcon;