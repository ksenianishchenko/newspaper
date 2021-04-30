class AddTweetIdToComments < ActiveRecord::Migration[6.0]
  def change
    add_column :comments, :tweet_id, :integer
  end
end
