#let colors = (
  bg: rgb("#2D2926"),
  fg: rgb("#FFFFFF"),
)

#set page("presentation-4-3", fill: colors.bg)
#set text(font: "Uncut Sans", fill: colors.fg)

#let default = ()

#let input = sys.inputs.at("data", default: json.encode(default))
#let data = json(bytes(input))

= Leaderboard

#repr(data)
