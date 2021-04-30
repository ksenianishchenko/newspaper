import userTypes from "./user-types";

export const setCurrentUser = (user) => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user
});

//status true or false
export const setLoggedIn = (status) => ({
  type: userTypes.SET_LOGGED_IN,
  payload: status
})

export const setLogginError = (status) => ({
  type: userTypes.SET_LOGGIN_ERROR,
  payload: status
})

export const setUserProfile = (profile) => ({
  type: userTypes.SET_USER_PROFILE,
  payload: profile
})

export const setNewUserFromAdmin = (user) => ({
  type: userTypes.CREATE_NEW_USER_FROM_ADMIN_STATUS,
  payload: user
})

export const setProfileUpdateStatus = (status) => ({
  type: userTypes.PROFILE_UPDATE_STATUS,
  payload: status
})

export const getUserFeed = (userFeed) => ({
  type: userTypes.GET_USER_FEED,
  payload: userFeed
})

export const getUserFollowers = (userFollowers) => ({
  type: userTypes.GET_USER_FOLLOWERS,
  payload: userFollowers
})

export const getUserFollowing = (userFollowing) => ({
  type: userTypes.GET_USER_FOLLOWING,
  payload: userFollowing
})