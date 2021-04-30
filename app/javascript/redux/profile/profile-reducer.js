import API from "../../api";
import profileTypes from "./profile-types";
import {
  getProfileFollowers,
  getProfileFollowing,
  setProfile,
  setProfileFeed
} from "./profile-actions";

import { setUserProfile } from "../user/user-actions";

const INITIAL_STATE = {
  profileFollowers: [],
  profileFollowing: [],
  profile: null,
  profileFeed: [],
}

const onGetProfile = (id) => {
  return (dispatch) => {
    API.get(`user/profile/${id}`)
    .then((res) => {
      console.log(res);
      dispatch(setUserProfile(res.data));
    }).catch((error) => {
      // we need to handle errors here!
      console.log(error);
    })
  }
}

const onGetProfileFollowers = (profile) => {
  return (dispatch) => {
    API.get("relationships/followers", {params: {userId: profile.id}})
    .then((res) => {
      console.log(res);
      dispatch(getProfileFollowers(res.data.followers));
    }).catch((error) => {
      // we need to handle errors here!
      console.log(error);
    })
  }
}

const onGetProfileFollowing = (profile) => {
  return (dispatch) => {
    API.get("relationships/followed", {params: {userId: profile.id}})
    .then((res) => {
      console.log(res);
      dispatch(getProfileFollowing(res.data.following));
    }).catch((error) => {
      // we need to handle errors here!
      console.log(error);
    })
  }
}

const onGetProfileFeed = (profile) => {
  return (dispatch) => {
    API.get("feed", {params: {userId: profile.id}})
    .then((res) => {
      dispatch(setProfileFeed(res.data));
    }).catch((error) => {
      console.log(error);
    })
  }
}

const profileReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case profileTypes.GET_PROFILE_FOLLOWERS:
      return {
        ...state,
        profileFollowers: action.payload
      }
    case profileTypes.GET_PROFILE_FOLLOWING:
      return {
        ...state,
        profileFollowing: action.payload
      }
    case profileTypes.SET_PROFILE_FEED:
      return {
        ...state,
        profileFeed: action.payload
      }
    case profileTypes.SET_PROFILE:
      return {
        ...state,
        profile: action.payload
      }
    default:
      return state;
  }
}

export {profileReducer, onGetProfileFollowers, onGetProfileFollowing, onGetProfileFeed, onGetProfile};