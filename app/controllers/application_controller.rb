class ApplicationController < ActionController::Base
  #before_action :clear_tokens_in_db

  protect_from_forgery with: :null_session

  def add_token_in_db(user, token, exp, iat) 
    @jwt = Token.create({
        :user_id => user.id,
        :token => token,
        :exp => exp,
        :iat => iat,
      })

    if @jwt.save
      p @jwt
    end
  end

  def token_exist_in_db(current_token)
    token = Token.find_by(token: current_token)
  end

  def current_user
    if auth_header
      token = auth_header
      begin
        decoded_token = JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: "HS256")
        p "Decoded_token, #{decoded_token}!"
        #decoded_token = [{"sub"=>1, "iat"=>1607669676, "exp"=>1607676876}, {"alg"=>"HS256"}]        
      rescue JWT::DecodeError 
        p "Not Decoded_token!"
        nil 
      end

      #check that token doesn't expire yet and exist in db
      current_time = Time.now
      if decoded_token[0]["exp"] > current_time.to_i && token_exist_in_db(token)
        @user = User.find(decoded_token[0]["sub"])
      else
        p "Token expired or doesn't exist in db!"
      end

      if decoded_token[0]["exp"] > current_time.to_i
        @user = User.find(decoded_token[0]["sub"])
      else
        p "Token expired or doesn't exist in db!"
      end

    end
  end

  def auth_header    
    request.headers["Authorization"]
  end

  def clear_tokens_in_db
    current_time = Time.now.to_i

    tokens = Token.where("exp < :max", max: current_time)
    tokens.destroy_all
    tokens.each do |token|
      p token
    end
  end

  def get_user_followers(params)
    @relationships = Relationship.where("followed_id = ?", params[:userId])
    p @relationships
    @followers = []
    @relationships.each do |rel|
      follower = User.where(id: rel.follower_id)
      @followers.push(follower[0])
    end
    p @followers
    return @followers
  end

  def get_user_following(params)
    @relationships = Relationship.where("follower_id = ?", params[:userId])
    @following = []
    @relationships.each do |rel|
      followed = User.where(id: rel.followed_id)
      @following.push(followed[0])
    end
    return @following
  end

  def get_profile
    @profile = User.find(params[:id])

    if @profile
      render json: @profile
    else
      warden.custom_failure!
      render :json=> @profile.errors, :status=>422
    end
  end

end
