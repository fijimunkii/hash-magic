class WandsController < ApplicationController
  def index
  end

  def trigger
    Trigger.set params[:id]
    render json: { success: true }
  end
end
