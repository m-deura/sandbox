class Edge < ApplicationRecord
  belongs_to :source_node_id
  belongs_to :target_node_id
end
