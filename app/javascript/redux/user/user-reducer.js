import {
  setCurrentUser,
  setLoggedIn,
  setLogginError,
  setUserProfile,
  setNewUserFromAdmin,
  setProfileUpdateStatus,
  getUserFeed,
  getUserFollowers,
  getUserFollowing
} from "./user-actions";
import API from "../../api";
import userTypes from "./user-types";

const INITIAL_STATE = {
  currentUser: null,
  logged_in: null,
  loggin_error: false,
  profileBySearch: null,
  createNewUserFromAdmin: null,
  profileUpdateStatus: null,
  userFeed: [],
  userFollowers: [],
  userFollowing: []
}

const onSignUpRequest = (userValues) => {
  return (dispatch) => {
    API.post("users", {user: userValues})
    .then((res) => {
      dispatch(setCurrentUser(res.data.user));
      dispatch(setLoggedIn(true));
      localStorage.setItem("token", res.data.token);
    }).catch((error) => {
      dispatch(setLoggedIn(false));
      console.log(error);
      alert(error);
    })
  }
}

const onLoginRequest = (userValues) => {
  return (dispatch) => {
    API.post("users/sign_in", {user: userValues})
    .then((res) => {
      console.log(res);
      dispatch(setCurrentUser(res.data.user));
      dispatch(setLoggedIn(true));
      //save token in localStorage
      localStorage.setItem("token", res.data.token);
    }).catch((error) => {
      console.log(error);
      alert(error);
    })
  }
}

const onLogoutRequest = () => {
  return (dispatch) => {
    API.get("users/sign_out")
    .then((res) => {
      dispatch(setCurrentUser(null));
      dispatch(setLoggedIn(false));
      dispatch(setUserProfile(null));
      dispatch(getUserFeed([]));
      dispatch(getUserFollowers([]));
      dispatch(getUserFollowing([]));
      //remove token in localStorage
      localStorage.removeItem("token");
    }).catch((error) => {
      console.log(error);
      alert(error);
    })
  }
}

const onLoggedInRequest = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      API.get("logged_in", {
        headers: {
          Authorization: token
        }})
      .then((res) => {
        if (res.data.logged_in === true) {
          dispatch(setCurrentUser(res.data.user));
          //dispatch(getUserFeed(res.data.user));
          dispatch(setLoggedIn(true));
        }
      }).catch((error) => {
        dispatch(setLoggedIn(false));
        console.log(error);
      })
    } else {
      dispatch(setLoggedIn(false));
    }
  }
}

//set user profile, that we found through admin panel
const onSearchUserProfile = (searchValue) => {
  return (dispatch) => {
    API.post(`profile`, { user: {
      handle: searchValue
    }})
    .then((res) => {
      dispatch(setUserProfile(res.data));
    }).catch((error) => {
      alert("User not found!");
    })
  }
}

const onCreateNewUser = (userValues) => {
  return (dispatch) => {
    API.post("admin/users", {user: userValues})
    .then((res) => {
      dispatch(setNewUserFromAdmin(null))
      
      if (res.data.user) {
        dispatch(setNewUserFromAdmin(res.data.user))
      }
    }).catch((error) => {
      alert(error);
    })
  }
}

const onDeleteUser = (userId) => {
  return (dispatch) => {
    API.delete("profile", {data: {id: userId}})
    .then((res) => {
      console.log(res);
      if(res.status === 201) {
        dispatch(setUserProfile(null))
      }
    }).catch((error) => {
      alert(error);
    })
  }
}

const onGetUserFeed = (currentUser) => {
  return (dispatch) => {
    API.get("feed", {params: {userId: currentUser.id}})
    .then((res) => {
      console.log("Successful Get of Feed");
      dispatch(getUserFeed(res.data));
    }).catch((error) => {
      console.log(error);
      alert(error);
    })
  }
}

const onUpdateUserFromAdmin = (userId, userValues) => {
  return (dispatch) => {
    API.put(`profile/${userId}`, {user: userValues})
    .then((res) => {
      if(res.data) {
        dispatch(setProfileUpdateStatus(true));
        dispatch(setUserProfile(res.data));
      }
    }).catch((error) => {
      dispatch(setProfileUpdateStatus(false));
      alert(error);
    })
  }
}

const onGetUserFollowers = (currentUser) => {
  return (dispatch) => {
    API.get("relationships/followers", {params: {userId: currentUser.id}})
    .then((res) => {
      console.log(res);
      dispatch(getUserFollowers(res.data.followers));
    }).catch((error) => {
      // we need to handle errors here!
      console.log(error);
      alert(error);
    })
  }
}

const onGetUserFollowing = (currentUser) => {
  return (dispatch) => {
    API.get("relationships/followed", {params: {userId: currentUser.id}})
    .then((res) => {
      console.log(res);
      dispatch(getUserFollowing(res.data.following));
    }).catch((error) => {
      // we need to handle errors here!
      console.log(error);
      alert(error);
    })
  }
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case userTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }
    case userTypes.SET_LOGGED_IN:
      return {
        ...state,
        logged_in: action.payload
      }
    case userTypes.SET_LOGGIN_ERROR:
      return {
        ...state,
        loggin_error: action.payload
      }
    case userTypes.SET_USER_PROFILE:
      return {
        ...state,
        profileBySearch: action.payload
      }
    case userTypes.CREATE_NEW_USER_FROM_ADMIN_STATUS:
      return {
        ...state,
        createNewUserFromAdmin: action.payload
      }
    case userTypes.PROFILE_UPDATE_STATUS:
      return {
        ...state,
        profileUpdateStatus: action.payload
      }
    case userTypes.GET_USER_FEED:
      return {
        ...state,
        userFeed: action.payload
      }
    case userTypes.GET_USER_FOLLOWERS:
      return {
        ...state,
        userFollowers: action.payload
      }
    case userTypes.GET_USER_FOLLOWING:
      return {
        ...state,
        userFollowing: action.payload
      }
    default:
      return state;
  }
}

export {
  userReducer,
  onSignUpRequest,
  onLoginRequest,
  onLogoutRequest,
  onLoggedInRequest,
  onSearchUserProfile,
  onCreateNewUser,
  onDeleteUser,
  onUpdateUserFromAdmin,
  onGetUserFeed,
  onGetUserFollowers,
  onGetUserFollowing
};
