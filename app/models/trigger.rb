class Trigger
  INTERVAL = 0.50

  @prev_time = 0
  @seen

  def self.set
    @prev_time = DateTime.now.to_f
    # @seen = false
  end

  def self.active?(display_id)
    now = DateTime.now.to_f
    one_second_ago = now - INTERVAL

    is_active = @prev_time.between?(one_second_ago, now)
    # if is_active && !@seen
    #   @seen = true
    #   return true
    # else
    #   return false
    # end

  end

end
