// Imports
#import "@preview/brilliant-cv:3.3.0": cv-section, cv-skill, hBar
#let metadata = toml("../metadata.toml")
#let cv-section = cv-section.with(metadata: metadata)


#cv-section("Skills")

#cv-skill(
  type: [Nationality],
  info: [Spain (EU)],
)

#cv-skill(
  type: [Languages],
  info: [English (business fluent), Spanish (native)],
)

#cv-skill(
  type: [Coding],
  info: [Python, Rust, Java, Go, TypeScript, C, JavaScript, HTML/CSS],
)

#cv-skill(
  type: [Cloud & Infra],
  info: [AWS (Redshift, S3, Glue, Lambda, SageMaker), Azure, GCP, Terraform, Docker, Kubernetes],
)

#cv-skill(
  type: [Data Engineering],
  info: [PySpark, Pandas, Databricks, Airflow, DBT, Kafka, MLflow, FastAPI],
)

#cv-skill(
  type: [DevOps],
  info: [CI/CD, GitHub Actions, ArgoCD, Terragrunt, Prometheus, Grafana],
)

#cv-skill(
  type: [Databases],
  info: [SQL Server, PostgreSQL, MySQL, MongoDB, Athena, Cassandra, Redis],
)

#cv-skill(
  type: [Interests],
  info: [Hiking, Reading, Photography, Cooking, Gaming, Music production, Cats],
)
