class CreateEdges < ActiveRecord::Migration[7.2]
  def change
    create_table :edges do |t|
      t.references :source_node_id, null: false, foreign_key: true
      t.references :target_node_id, null: false, foreign_key: true

      t.timestamps
    end
  end
end
