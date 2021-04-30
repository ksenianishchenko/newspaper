class RenameFriendsToRelationships < ActiveRecord::Migration[6.0]
  def change
    rename_table :friends, :relationships
  end
end
