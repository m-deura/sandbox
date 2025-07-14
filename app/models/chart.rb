class Chart < ApplicationRecord
  belongs_to :user
  has_many :nodes, dependent: :destroy
  has_many :edges, dependent: :destroy
end
