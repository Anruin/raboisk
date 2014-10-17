class Organization
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  field :description, type: String
  field :geo, type: Hash, default: {country:"", city:"", coords:[0,0]}
  field :website, type: String
  field :email, type: String

  has_many :vacancies, dependent: :delete
  accepts_nested_attributes_for :vacancies
  #field :administrated_by, type: Moped::BSON::ObjectId
end
