class CreateTokens < ActiveRecord::Migration[6.0]
  def change
    create_table :tokens do |t|
      t.string :user_id
      t.string :token
      t.integer :exp
      t.integer :iat

      t.timestamps
    end
  end
end
