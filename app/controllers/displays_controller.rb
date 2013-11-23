class DisplaysController < ApplicationController

  def index
  end

  def listen
    display_id = params[:id]
    should_trigger = Trigger.active?(display_id)
    render json: { trigger: should_trigger }
  end

end
