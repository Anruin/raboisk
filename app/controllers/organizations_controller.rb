class OrganizationsController < ApplicationController
  before_action :set_organization, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token
  skip_before_filter :verify_authenticity_token

  # GET /organizations
  # GET /organizations.json
  def index
    @organizations = Organization.all
  end

  # GET /organizations/1
  # GET /organizations/1.json
  def show
  end

  # POST /organizations
  # POST /organizations.json
  def create
    @organization = Organization.new(organization_params)
    #@project.something_special!
    create!
  end

  # PATCH/PUT /organizations/1
  # PATCH/PUT /organizations/1.json
  def update

    #@organization = Organization.update(organization_params)
    #@project.something_special!
    update!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_organization
      @organization = Organization.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def organization_params
      #geo hash dont work:
      #params.require(:organization).permit(:name, :description, :geo, :website, :email, :administrated_by)
      #all params, include hash types, are working:
      params.require(:organization).permit!
      #custom params: http://goo.gl/OeIwah
    end
end





















  # # GET /organizations/new
  # def new
  #   @organization = Organization.new
  # end

  # # GET /organizations/1/edit
  # def edit
  # end






