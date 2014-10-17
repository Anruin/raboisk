class User
  include Mongoid::Document
  include Mongoid::Timestamps

  field :employed_by, type: String

end
