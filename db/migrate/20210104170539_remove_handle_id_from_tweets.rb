class RemoveHandleIdFromTweets < ActiveRecord::Migration[6.0]
  def change
    remove_reference :tweets, :handle, null: false
  end
end
