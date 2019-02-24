/**
 * 当前用户
 */
const userInfo = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return action.item;
    case 'REMOVE_USER_INFO':
      return {};
    default:
      return state;
  }
};

export default userInfo;
