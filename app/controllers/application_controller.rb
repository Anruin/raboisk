#class ApplicationController < InheritedResources::Base
class ApplicationController < ActionController::Base
   inherit_resources
   actions :all#, :except => [ :destroy]
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
end
