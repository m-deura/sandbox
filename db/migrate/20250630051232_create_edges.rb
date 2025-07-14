class CreateEdges < ActiveRecord::Migration[7.2]
  def change
    create_table :edges do |t|
      t.references :source_node, null: false, foreign_key: { to_table: :nodes }
      t.references :target_node, null: false, foreign_key: { to_table: :nodes }
      t.references :chart, null: false, foreign_key: true

      t.timestamps
    end
  end
end
