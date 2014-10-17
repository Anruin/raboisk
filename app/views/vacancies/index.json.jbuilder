json.array!(@vacancies) do |vacancy|
  json.extract! vacancy, :id
  json.extract! vacancy, :organization
  json.extract! vacancy, :name
  json.extract! vacancy, :salary
  json.extract! vacancy, :description
  json.extract! vacancy, :requires
  json.extract! vacancy, :conditions
  json.extract! vacancy, :created_at
  json.extract! vacancy, :updated_at
  json.url vacancy_url(vacancy, format: :json)
end
