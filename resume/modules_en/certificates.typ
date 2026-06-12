// Imports
#import "@preview/brilliant-cv:3.3.0": cv-section, cv-honor
#let metadata = toml("../metadata.toml")
#let cv-section = cv-section.with(metadata: metadata)


#cv-section("Certificates")

#cv-honor(
  date: [2022],
  title: [AWS Certified Security],
  issuer: [Amazon Web Services (AWS)],
)

#cv-honor(
  date: [2017],
  title: [Applied Data Science with Python],
  issuer: [Coursera],
)

#cv-honor(
  date: [],
  title: [SQL Fundamentals Track],
  issuer: [Datacamp],
)
