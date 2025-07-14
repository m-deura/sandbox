# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

admin_user = User.find_by(id: 1) || User.create!(email: "admin@example.com", password: "password")
chart = Chart.find_by(id: 1) || Chart.create!(user: admin_user)

action_arr = []

bottom = Action.create!(
  user: admin_user,
  title: "BOTTOM",
  action_type: :offense,
  mastery_level: :Perfect
  )

top = Action.create!(
  user: admin_user,
  title: "TOP",
  action_type: :offense,
  mastery_level: :Perfect
)

action_arr << bottom << top

1.upto(4) do |n|
  action = Action.create!(user: admin_user, title: "title#{n}", detail: "detail#{n}")
  action_arr << action
end


# a1 = Action.create!(
#   title: "肩襟片袖",
#   detail: "自分の手の甲が見える状態で、相手の袖を引っ張る。",
#   action_type: :offense,
#   mastery_level: :Familiar
# )

# a2 = Action.create!(
#   title: "アンストッパブル",
#   detail: "相手の襟を掴む手で相手の顎をかちあげる。",
#   action_type: :offense,
#   mastery_level: :Familiar
# )

# a3 = Action.create!(
#   title: "アンクルピック",
#   detail: "瞬間的に相手の踵を拾う。",
#   action_type: :offense,
#   mastery_level: :Familiar
# )

node_arr = action_arr.map { |action| Node.create!(chart: chart, action: action) }

edges = [
  [ 0, 2 ],
  [ 0, 3 ],
  [ 2, 4 ],
  [ 2, 5 ]
]

edges.each do |src, tgt|
  Edge.create!(chart: chart, source_node: node_arr[src], target_node: node_arr[tgt])
end
