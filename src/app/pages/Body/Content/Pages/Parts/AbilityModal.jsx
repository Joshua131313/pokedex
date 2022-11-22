import React, { useEffect } from 'react'
import Modal from '../../../../../components/Modal/Modal'
import useGetAbilityDetails from '../../../../../services/GetAbilityDetails'

const AbilityModal = (props) => {
  const {selectedAbility, setSelectedAbility} = props
  
  const abilityDetails = useGetAbilityDetails({selectedAbility})
  return (
  <Modal modal={selectedAbility} className='abilitymodal'>
      <div className="abilitymodal">
        <h2>{selectedAbility}</h2>
        <i className='closeicon fal fa-times' onClick={()=> setSelectedAbility('')}></i>
        <div className="abilitydescrip">
         <span>{abilityDetails.effect_entries?.find(x=> x.language.name === 'en').effect}</span>
        </div>
      </div>
    </Modal>
  )
}
export default AbilityModal