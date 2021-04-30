class AddFollowedIdToFriend < ActiveRecord::Migration[6.0]
  def change
    add_column :friends, :followed_id, :integer
  end
end
