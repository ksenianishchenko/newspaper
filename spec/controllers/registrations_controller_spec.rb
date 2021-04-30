require "rails_helper"

RSpec.describe RegistrationsController, :type => :controller do
  describe "responds to" do

    before :each do
      @request.env['devise.mapping'] = Devise.mappings[:user]
    end

    user_params = {
      email: 'test@gmail.com',
      handle: 'test_t',
      password: 'password123',
      password_confirmation: 'password123'
    }

    it "should sign up new user" do
      post :create, :params => { :user => user_params}

      expect(response).to have_http_status(200)
      assert_response :success
    end

  end
end
