require 'rails_helper'

RSpec.describe Relationship, type: :model do
  it { should belong_to(:follower).class_name('User') }
  it { should belong_to(:followed).class_name('User') }

  subject {
    user_one = User.new(email: 'test1@test.com', handle: 'test1')
    user_two = User.new(email: 'test2@test.com', handle: 'test2')
    described_class.new(follower: user_one.id, followed: user_two.id)
  }

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

end


