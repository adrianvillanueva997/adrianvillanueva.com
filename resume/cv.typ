// Imports
#import "@preview/brilliant-cv:4.1.0": cv
#let metadata = toml("./metadata.toml")
#let importModules(modules) = {
  for module in modules {
    include {
      "modules_en/" + module + ".typ"
    }
  }
}


#show: cv.with(
  metadata,
  profile-photo: image("./src/avatar.png"),
)
#importModules((
  "skills",
  "education",
  "professional",
  // "projects",
  // "certificates",
  // "publications",

))
