class CreateActions < ActiveRecord::Migration[7.2]
  def change
    create_table :actions do |t|
      t.string :title, null: false
      t.text :detail
      t.integer :action_type, null: false, default: 0
      t.integer :mastery_level, default: 1

      t.timestamps
    end
  end
end
