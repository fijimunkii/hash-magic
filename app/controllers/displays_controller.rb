class DisplaysController < ApplicationController

  def index
  end

  def listen
    should_trigger = Trigger.active?(params[:id])
    render json: { trigger: should_trigger }
  end

end
