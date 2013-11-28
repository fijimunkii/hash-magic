class Trigger
  INTERVAL = 0.50

  @prev_time = {}
  @seen = {}

  def self.set(session_id)
    @prev_time[session_id] = DateTime.now.to_f
    @seen[session_id] = false
  end

  def self.active?(session_id)
    now = DateTime.now.to_f
    one_second_ago = now - INTERVAL

    is_active = @prev_time[session_id].between?(one_second_ago, now) if @prev_time[session_id]

    if is_active && !@seen[session_id]
      @seen[session_id] = true
      return true
    else
      return false
    end

  end

end
