Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: "registrations", sessions: "sessions"}

  devise_scope :user do
    get 'logged_in' => 'sessions#logged_in?'
    post 'admin/users' => 'registrations#create_from_admin'
    delete 'profile' => 'administration#destroy_profile'
    put 'profile/:id' => 'administration#update_profile'
    post 'profile' => 'administration#get_profile_by_email'
    get 'user/profile/:id' => 'application#get_profile'
  end

  root 'home#index'

  post '/tweets' => 'tweets#create'
  post 'tweets/retweet' => 'tweets#retweet'
  get 'tweets/retweet' => 'tweets#get_retweets'
  delete '/tweets' => 'tweets#delete'
  
  get '/feed' => 'tweets#get_user_feed'

  post '/relationships' => 'relationships#new'
  delete '/relationships' => 'relationships#delete'
  get '/relationships/followers' => 'relationships#get_followers'
  get '/relationships/followed' => 'relationships#get_following'

  get '/favorites' => 'favorites#get_favorites_for_tweet'
  get '/favorites/get_is_liked' => 'favorites#get_is_liked'
  post '/favorites/like' => 'favorites#new'
  delete '/favorites/unlike' => 'favorites#delete'

  #Comments path

  post 'tweet/comment' => 'comments#create'
  delete 'tweet/comment' => 'comments#destroy'
  get 'tweet/:tweet_id/comments' => 'comments#get_comments'

  get '*path', to: 'home#index'

end
