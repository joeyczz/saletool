/**
 * 当前门店
 */
const activeStore = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_STORE':
      return action.item;
    case 'REMOVE_ACTIVE_STORE':
      return {}
    default:
      return state;
  }
};

export default activeStore;