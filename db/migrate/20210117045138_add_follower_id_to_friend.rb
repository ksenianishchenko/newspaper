class AddFollowerIdToFriend < ActiveRecord::Migration[6.0]
  def change
    add_column :friends, :follower_id, :integer
  end
end
