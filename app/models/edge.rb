class Edge < ApplicationRecord
  belongs_to :source_node, class_name: "Node", foreign_key: "source_node_id"
  belongs_to :target_node, class_name: "Node", foreign_key: "target_node_id"
end
