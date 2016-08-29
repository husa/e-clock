import {SET_INTRO} from '../actions/intro';

function intro (state = false, action) {
  if (action.type === SET_INTRO) return !!action.value;
  return state;
}

export default intro;
