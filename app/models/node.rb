class Node < ApplicationRecord
  belongs_to :action
  has_many :outgoing_edges, class_name: "Edge", foreign_key: "source_node_id", dependent: :destroy
  has_many :incoming_edges, class_name: "Edge", foreign_key: "source_node_id", dependent: :destroy
end
