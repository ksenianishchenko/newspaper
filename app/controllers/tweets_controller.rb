class TweetsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @user = User.find_by(handle: params[:user][:handle])
    # throw error if not currentUser ??
    @new_tweet = @user.tweets.build(
      body: params[:newTweet],
      handle: @user[:handle],
    )
    if @new_tweet.save
      render json: {newTweet: @new_tweet}
    else
      # we need better error message?
      render json: {message: "Error: Tweet Not Posted"}, status: :unauthorized
    end
  end

  def retweet
    @user = User.find_by(handle: params[:currentUser][:handle])
    @tweet = Tweet.find_by(id: params[:tweet])
    @tweet_body = params[:tweet][:body]
    @tweet_handle = params[:tweet][:handle]
    @tweet_id = params[:tweet][:id]

    # throw error if not currentUser ??
    @retweet = @user.tweets.build(
      body: @tweet_body,
      handle: @tweet_handle,
      parent_id: @tweet_id
    )
    if @retweet.save
      render json: {retweet: @retweet}
    else
      # we need better error message?
      render json: {message: "Error: Retweet Unsuccessful"}, status: :unauthorized
    end
  end

  def get_retweets
    @retweets = Tweet.where("parent_id IS NOT NULL AND user_id = ?", params[:user_id])
    render json: @retweets
  end

  def delete
    @tweet = Tweet.find(params[:id].to_i)
    @tweet.destroy
    render json: @tweet
  end

  def get_user_feed
    # all tweets from current_user and other users followed by current_user
    @user_following = get_user_following(params)
    following_ids = []
    @user_following.each do |user|
      following_ids.push(user[:id])
    end
    @user_feed = Tweet.where("user_id in (?) OR user_id = ?",
                      following_ids, params[:userId]).reverse_order
                      
    render json: @user_feed
  end

end
