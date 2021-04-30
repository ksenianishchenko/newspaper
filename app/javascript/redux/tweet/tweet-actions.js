import tweetTypes from './tweet-types'

export const postNewTweet = (tweetText) => ({
  type: tweetTypes.POST_NEW_TWEET,
  payload: tweetText
});

export const deleteTweet = (tweetId) => ({
  type: tweetTypes.DELETE_TWEET,
  payload: deleteTweet
});

export const setNewTweetPopup = (status) => ({
  type: tweetTypes.SET_NEW_TWEET_POPUP_STATUS,
  payload: status
});

export const favoriteTweet = (tweet) => ({
  type: tweetTypes.FAVORITE_TWEET,
  payload: tweet
})

export const retweet = (tweet) => ({
  type: tweetTypes.RETWEET,
  payload: tweet
})