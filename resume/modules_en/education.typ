// Imports
#import "@preview/brilliant-cv:3.3.0": cv-section, cv-entry, hBar
#let metadata = toml("../metadata.toml")
#let cv-section = cv-section.with(metadata: metadata)


#cv-section("Education")

#cv-entry(
  title: [Bachelor’s Degree in Computer Science],
  society: [Universidad Europea de Madrid],
  date: [2015 – 2022],
  location: [Spain],
  logo: image("../src/logos/uem.jpg"),
  description: list(
    [Thesis: Self-hosted AI-driven platform for security camera monitoring using edge computing],
  ),
)
