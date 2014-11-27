class Question < ActiveRecord::Base
	has_many :rules

  def as_json(*opts)
    hash = super
    hash[:rules] = rules.as_json
    hash
  end

end
