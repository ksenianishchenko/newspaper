class FavoritesController < ApplicationController
  skip_before_action :verify_authenticity_token

  # params: tweet, user
  def new
    @favorite = Favorite.create(
      tweet_id: params[:tweet][:id],
      user_id: params[:user][:id]
    )
    if @favorite.save
      render json: {favorite: @favorite}
    else
      # we need better error message?
      render json: {message: "Error liking tweet"}, status: :unauthorized
    end
  end

  # params: favorite (we've already made API call to get the favorite)
  def delete
    @favorite = Favorite.find(params[:id])
    if @favorite.destroy
      render :json=> { success: 'favorite was successfully deleted' }, :status=>201
    else
      render :json=> { error: 'favorite could not be deleted' }, :status=>422
    end
  end

  # params: tweet
  def get_favorites_for_tweet
    @favorites = Favorite.where("tweet_id = ?", params[:id])
    @users = []
    @favorites.each do |fav|
      user = User.where("id = ?", fav.user_id)
      @users.push([ user[0].id, user[0].handle ])
    end
    render json: {favorites: @users}
  end

  # params: tweet, user
  def get_is_liked
    @favorite = Favorite.where(tweet_id: params[:tweetId], user_id: params[:userId])
    render json: {favorite: @favorite}
  end
end
