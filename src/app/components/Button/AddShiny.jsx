import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { handleShinyArray } from '../../utils/DBFunctions';
import { StoreContext } from '../../../ContextAPI';
import firebase from 'firebase';

const AddShiny = props => {
    const user = firebase.auth().currentUser
    const {shinyArray, setShinyArray} = useContext(StoreContext)
    const {pokemon, El= 'div', className, onClick, style} = props
    const addShiny = () => {
        if(user) {
            handleShinyArray(pokemon)
        }
       else {
            let tempState = [...shinyArray];
            if (tempState.includes(pokemon.id)) {
            let index = tempState.indexOf(pokemon.id);
                tempState.splice(index, 1);
            } else {
                tempState.push(pokemon.id);
            }
            setShinyArray([...tempState]);
       }
    }
    return (
        <El 
          style={style}
          className={className}
          onClick={()=>{
            addShiny()
            onClick()
          }
          } 
        >
            {props.children}
        </El>
    );
};

AddShiny.propTypes = {
    
};

export default AddShiny;