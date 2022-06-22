const inititalState = { 
    user:null
 };
const userReducer = (state = inititalState, action) => {
  switch (action.type) {
    case "ADDUSER": {
      return { ...state, user: action.payload };
    }
    case "REMOVEUSER": {
        return { ...state, user: null };
      }
    default:{
        return state
}
  }
};
export default userReducer;