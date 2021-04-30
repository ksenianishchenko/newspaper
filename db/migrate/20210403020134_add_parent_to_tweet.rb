class AddParentToTweet < ActiveRecord::Migration[6.0]
  def change
    add_column :tweets, :parent_id, :integer, null: true
    add_foreign_key :tweets, :tweets, column: :parent_id
  end
end
