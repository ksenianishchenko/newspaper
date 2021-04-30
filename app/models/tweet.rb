class Tweet < ApplicationRecord
  belongs_to :user #, foreign_key: :handle_id
  has_many :favorites, dependent: :destroy
  has_many :comments, dependent: :destroy
  belongs_to :parent, class_name: "Tweet", optional: true
  has_many :retweets, class_name: "Tweet",
            foreign_key: "parent_id", dependent: :destroy
end
