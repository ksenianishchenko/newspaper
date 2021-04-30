class CommentsController < ApplicationController

  def create
    @tweet = Tweet.find(params[:tweet_id])
    @comment = @tweet.comments.create(comment_params)

    if @comment.save
      render json: @tweet.comments.reverse_order
    else
      render json: @comment.errors, status: :unprocessable_entity
    end

  end

  def get_comments
    @tweet = Tweet.find(params[:tweet_id])

    if @tweet
      render json: @tweet.comments.reverse_order
    else
      render json: @tweet.errors, status: 404
    end

  end

  def destroy
    @tweet = Tweet.find(params[:tweet_id])
    @comment = @tweet.comments.where("tweet_id = ?", params[:tweet_id])[0]

    p @comment

    if @comment.destroy
      render json: {
        comment: @comment,
        message: 'Comment deleted'
      }
    end
  end

  private
    def comment_params
      params.require(:comment).permit(:author, :comment, :author_id)
    end

end
