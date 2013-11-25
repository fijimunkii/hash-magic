class WelcomeController < ApplicationController
  def index
    @time = Time.new.to_s.gsub('?','').gsub('%','').gsub(':','').gsub(' ','').to_s
  end

  def trigger
    @time = params[:id]
    render :index
  end
end
