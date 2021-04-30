require 'rails_helper'

RSpec.describe User, type: :model do

  it "should create a user" do
    @user = User.create(
      email: 'test@gmail.com', 
      password: 'password123',
      password_confirmation: 'password123'
    )
    expect(@user).to be_truthy
    expect(@user.email).to eq('test@gmail.com')
  end

  it "is not valid without a email" do
    user = User.create(
      email: nil, 
      password: 'password123',
      password_confirmation: 'password123'
    )
    expect(user).to_not be_valid
  end

  it "should have matched password and password_confirmation" do
    user = User.create(
      email: 'test@gmail.com', 
      password: 'password123',
      password_confirmation: 'password'
    )
    expect(user).to_not be_valid
  end

end
