class Mypage::ChartsController < ApplicationController
  before_action :authenticate_user!
  def show
    current_user.charts.nodes

    render json: ()
  end
end
