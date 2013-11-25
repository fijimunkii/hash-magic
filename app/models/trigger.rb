class Trigger
  INTERVAL = 0.50

  @prev_time = {}
  @seen = {}

  def self.set(id)
    @prev_time[id] = DateTime.now.to_f
    @seen[id] = false
  end

  def self.active?(id)
    now = DateTime.now.to_f
    one_second_ago = now - INTERVAL

    is_active = @prev_time[id].between?(one_second_ago, now) if @prev_time[id]
    if is_active && !@seen[id]
      @seen[id] = true
      return true
    else
      return false
    end

  end

end
