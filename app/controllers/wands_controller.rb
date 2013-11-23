class WandsController < ApplicationController
  def index
  end

  def trigger
    Trigger.set
    render json: { success: true }
  end
end
