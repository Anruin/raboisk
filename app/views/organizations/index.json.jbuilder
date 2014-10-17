json.array!(@organizations) do |organization|
  json.extract! organization, :id
  json.extract! organization, :name
  json.extract! organization, :description
  json.extract! organization, :geo
  json.extract! organization, :website
  json.extract! organization, :administrated_by
  json.url organization_url(organization, format: :json)
end
