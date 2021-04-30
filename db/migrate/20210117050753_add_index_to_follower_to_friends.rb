class AddIndexToFollowerToFriends < ActiveRecord::Migration[6.0]
  def change
    add_index :friends, [:follower_id, :followed_id], unique: true
  end
end
