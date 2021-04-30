class RelationshipsController < ApplicationController
  # params: follower, followed
  def new
    @relationship = Relationship.create(
      follower_id: params[:follower][:id],
      followed_id: params[:followed][:id]
    )
    if @relationship.save
      render json: {relationship: @relationship}
    else
      # we need better error message?
      render json: {message: "Error building relationship"}, status: :unauthorized
    end
  end

  def delete

    @relationship = Relationship.where(["follower_id = ? AND followed_id = ?", params[:follower_id], params[:followed_id]])
    @deleted = Relationship.find(@relationship[0].id)
    @list = Relationship.where("followed_id = ?", params[:follower_id])

    if @relationship[0].destroy
      render :json=> { 
          following: @list,
          success: 'relationship was successfully deleted' 
        }, :status=>201
    else
      render :json=> { error: 'relationship could not be deleted' }, :status=>422
    end
  end

  def get_followers
    @followers = get_user_followers(params)
    render json: {followers: @followers}
  end

  def get_following
    @following = get_user_following(params)
    render json: {following: @following}
  end

end
