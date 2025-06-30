class CreateNodes < ActiveRecord::Migration[7.2]
  def change
    create_table :nodes do |t|
      t.references :action_id, null: false, foreign_key: true

      t.timestamps
    end
  end
end
