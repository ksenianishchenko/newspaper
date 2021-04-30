class AddForeignKeyToHandle < ActiveRecord::Migration[6.0]
  def change
    add_reference :tweets, :handle, foreign_key: { to_table: :users }
  end
end
