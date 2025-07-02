class Node < ApplicationRecord
  belongs_to :action
  belongs_to :chart
  has_many :outgoing_edges, class_name: "Edge", foreign_key: "source_node_id", dependent: :destroy
  has_many :incoming_edges, class_name: "Edge", foreign_key: "source_node_id", dependent: :destroy
end
