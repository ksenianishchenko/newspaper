require "rails_helper"
require 'json'

RSpec.describe AdministrationController, :type => :controller do
  describe "administration controller" do

    profile_params = {
      email: 'test@gmail.com',
      handle: 'test_t',
      password: 'password123',
      password_confirmation: 'password123'
    }

    before :each do
      @request.env['devise.mapping'] = Devise.mappings[:user]
      @user = User.create({
        email: 'test@gmail.com',
        handle: 'test_t',
        password: 'password123',
        password_confirmation: 'password123'
      })
    end

    it "should find a profile" do
      post :get_profile, :params => { :user => profile_params}

      parsed_response = JSON.parse response.body

      expect(parsed_response['email']).to eq('test@gmail.com')
    end

    it "should destroy a profile" do
      delete :destroy_profile, :params => { :id => @user.id}

      parsed_response = JSON.parse response.body

      expect(response.status).to eq(201)
      expect(parsed_response['success']).to eq('user was successfully deleted')
    end

    it "should update a profile" do
      put :update_profile, :params => { :id => @user.id, :user => {
        email: 'updated@gmail.com',
        handle: 'test_t',
        password: 'password123',
        password_confirmation: 'password123' 
      }}

      parsed_response = JSON.parse response.body
      
      expect(parsed_response['email']).to eq('updated@gmail.com')
    end

  end
end