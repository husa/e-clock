import { SET_INTRO } from '../__actions/intro';

const intialState = false;

function intro(state = intialState, action) {
  if (action.type === SET_INTRO) return !!action.value;
  return state;
}

export default intro;
