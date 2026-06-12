// Imports
#import "@preview/brilliant-cv:3.3.0": cv-section, cv-entry
#let metadata = toml("../metadata.toml")
#let cv-section = cv-section.with(metadata: metadata)


#cv-section("Professional Experience")

#cv-entry(
  title: [Data Engineer],
  logo: image("../src/logos/woven_by_toyota.jpg"),
  society: [Woven by Toyota],
  date: [2024 - Present],
  location: [Tokyo, Japan],
  description: list(
    [Built and operated a cloud-native data mesh platform spanning multiple AWS and Databricks accounts, growing from the ground up to 1000+ users],
[Developed a multi-language Kafka ingestion SDK (Rust core with Python, Java, TypeScript, and Go bindings), deployed org-wide for real-time ingestion across heterogeneous systems],
[Designed CI/CD pipelines for ML and data workflows in Databricks with MLflow, data contracts, and OpenTelemetry for improved resilience and data quality],
[Maintained platform reliability through on-call rotations, incident response, and user support; established runbooks and observability practices to reduce mean time to resolution],
[Led platform adoption through self-service tooling, onboarding teams on medallion architecture and data mesh principles, and collaborating with the engineering hub to ensure CI/CD compliance with company processes],
  ),
  tags: (
    "AWS",
    "Databricks",
    "Rust",
    "Python",
    "Java",
    "Go",
    "TypeScript",
    "Kafka",
    "Terraform",
    "MLflow",
    "CI/CD",
    "OpenTelemetry",
    "Data Mesh",
    "Data Contracts",
    "Self-Service",
  ),
)

#cv-entry(
  title: [Data Engineer],
  society: [Albert Heijn],
  logo: image("../src/logos/albert_heijn.png"),
  date: [2022 - 2024],
  location: [Amsterdam, Netherlands],
  description: list(
    [Managed a company-wide data platform built on Azure and Databricks, supporting large-scale batch and real-time pipelines],
    [Built reusable Terraform modules and automated infrastructure provisioning to reduce deployment time and enforce compliance],
    [Created observability tooling using Python and Kusto to ensure data quality and regulatory compliance across data products],
    [Implemented CI/CD with GitHub Actions and ArgoCD, automating deployment of services and pipelines to Kubernetes clusters],
    [Worked closely with analysts and data scientists to productionize ML pipelines and deploy feature engineering workflows],
  ),
  tags: (
    "Azure",
    "Databricks",
    "Terraform",
    "CI/CD",
    "Python",
    "Kubernetes",
    "GitHub Actions",
    "Kusto",
  ),
)

#cv-entry(
  title: [Data Engineer],
  society: [Dashmote],
  date: [2021 - 2022],
  logo: image("../src/logos/dashmote.png"),
  location: [Amsterdam, Netherlands],
  description: list(
    [Led AWS-based infrastructure migration using Terraform, reducing manual provisioning and enabling reproducible environments],
    [Migrated legacy Airflow pipelines to PySpark for scalable data processing and analytics workflows],
    [Optimized Docker builds and CI pipelines to cut build time and reduce cloud costs by applying multi-stage techniques],
    [Designed and deployed a governed data lake on S3 with robust schema management and access controls],
    [Collaborated with data scientists to automate training data pipelines and streamline model experimentation],
  ),
  tags: (
    "AWS",
    "Terraform",
    "Python",
    "Apache Airflow",
    "PySpark",
    "Docker",
    "CI/CD",
  ),
)

#cv-entry(
  title: [Software Engineer],
  society: [Ernst & Young (EY)],
  logo: image("../src/logos/ey.png"),
  date: [2019 - 2020],
  location: [Madrid, Spain],
  description: list(
    [Built ETL pipelines in Python, SQL, and Java to automate financial reporting workflows across global client accounts],
    [Trained and deployed ML models for forecasting and risk scoring in regulated environments],
    [Built and deployed full-stack data visualization tools on Linux for internal analytics teams],
    [Participated in project planning with clients, translating business goals into deliverable data products],
  ),
  tags: (
    "Python",
    "SQL",
    "Java",
    "Talend",
    "Linux",
    "Machine Learning",
    "Full-stack",
  ),
)
