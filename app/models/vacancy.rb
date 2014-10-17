class Vacancy
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Attributes::Dynamic

  field :name, type: String
  field :salary, type: String
  field :description, type: String
  field :requires, type: String
  field :conditions, type: String

  #field :employer, type: Moped::BSON::ObjectId
  belongs_to :organization, dependent: :nullify
end
