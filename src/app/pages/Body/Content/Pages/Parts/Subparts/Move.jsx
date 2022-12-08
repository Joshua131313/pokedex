import React from "react";
import { replaceSpecialChar } from "../../../../../../utils/Functions";

const Move = (props) => {
  const { move, listView } = props;
  let movedetail = move.version_group_details[move.version_group_details.length - 1];
  //move.version_group_details[move.version_group_details.length-1] .level_learned .move_learned_method.name

  const determineText = () => {
    if (movedetail?.level_learned_at === 0) {
      if (movedetail?.move_learn_method?.name === 'machine') {
        return 'HM or TM'
      }
      else {
        return movedetail?.move_learn_method?.name
      }
    }
    return 'Lv' + movedetail?.level_learned_at
  };

  return (
    <div className={`move`}>
        <i className="fal fa-compact-disc"></i>
        <span className='movename'>{replaceSpecialChar(move?.move?.name)}</span>
        {listView !== 'list' && <span className='learnedby'>Learned by</span>}
        <span className={`lmethod ${movedetail?.move_learn_method?.name === 'machine'?'uncap':''}`}>{determineText()}</span>  
    </div>
  );
};
export default Move;
