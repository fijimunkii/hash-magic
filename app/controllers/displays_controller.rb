class DisplaysController < ApplicationController

  def index
  end

  def listen
    binding.pry
    should_trigger = Trigger.active?(params[:id], session[:_csrf_token])
    render json: { trigger: should_trigger }
  end

end
