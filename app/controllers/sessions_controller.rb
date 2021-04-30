class SessionsController < Devise::SessionsController
  before_action :authenticate_user!

  @token = nil

  # POST /v1/login
  def create
    # @user = User.find_by_email(user_params[:email])
    @user = User.find_by(handle: user_params[:handle])
    # @user = User.find_by_email(@user.email)
    # return invalid_login_attempt unless @user
    return invalid_login_attempt unless (@user.handle == user_params[:handle])

    if @user.valid_password?(user_params[:password])
      sign_in :user, @user
      # set time and check if jwt not expired time.now < exp
      @iat = Time.now

      #add 2 hours 
      @exp = @iat + 7200 
      
      @token = JWT.encode({sub: @user.id, iat: @iat.to_i, exp: @exp.to_i}, Rails.application.secrets.secret_key_base) # for production use ENV["SECRET_KEY"]
      
      #add token in db (table Tokens)
      add_token_in_db(@user, @token, @exp, @iat)

      render json: {
        user: @user,
        token: @token
      }
    else
      invalid_login_attempt
    end
  end

  def logged_in?
    if current_user
      render json: {
        user: current_user,
        logged_in: true
      }
    else
      render json: {message: "Please log in"}, status: :unauthorized
    end
  end

  def destroy
    sign_out(@user)
    render :json=> {:success=>true}
  end


  private

  def invalid_login_attempt
    warden.custom_failure!
    render json: {error: 'Invalid username or password'}, :status=>401
  end

  def user_params
     params.require(:user).permit(:handle, :password)
  end

end
