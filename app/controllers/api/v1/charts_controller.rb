class Api::V1::ChartsController < ApplicationController
  before_action :authenticate_user!
  def show
    # TODO: 将来的にユーザーがchartを複数持つようにした時は、paramsでchart IDを指定させる。
    nodes = current_user.charts.first.nodes
    edges = current_user.charts.first.edges

    nodes_data = nodes.map do |node|
      { data: { id: node.id, label: node.action.title } }
    end

    edges_data = edges.map do |edge|
      { data: { source: edge.source_node_id, target: edge.target_node_id } }
    end

    render json: (nodes_data + edges_data), status: :ok
  end
end
