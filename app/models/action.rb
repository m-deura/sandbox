class Action < ApplicationRecord
  has_many :nodes, dependent: :destroy

  enum action_type: { offense: 0, defense: 1 }
  enum mastery_level: { NotLearned: 0, Familiar: 1, Practicing: 2, AlmostThere: 3, Perfect: 4 }
end
