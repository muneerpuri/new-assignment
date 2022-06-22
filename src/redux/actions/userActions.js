export const addUser = (user) => {
    return {
      type: "ADDUSER",
      payload: user,
    };
  };


  export const removeUser = (user) => {
    return {
      type: "REMOVEUSER",
      payload: user,
    };
  };  