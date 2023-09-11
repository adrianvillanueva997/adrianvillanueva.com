---
title: "Testcontainers"
date: 2023-09-11
draft: false
description: "Playing around with testcontainers"
tags: ["testing", "rust", "software"]
categories: ["programming", "rust", "development"]

lightgallery: true
---

## Intro

I have been playing around with [testcontainers](https://www.testcontainers.com/) for a while now, and I have been using it in a few projects. I really like it, and I think it is a great tool for testing, so I decided to write a post about it.

## What is testcontainers?

Tescontainers is a library that allows you to run docker containers from your tests. It is available for many languages, including Java, Python, Go, Rust, and many more. It is a great tool for integration testing, and it is very easy to use. It provides already preconfigured containers for many popular databases, such as PostgreSQL, MySQL, MongoDB, Redis, and many more. It also allows you to run any docker image you want, so you can use it to run any service you want.

In this post, I will show you how to use it in Rust, but it is very similar in other languages.

## How to use it?

{{< admonition >}}
I assume that you have already installed Rust and Cargo in your system, if you do not have it feel free to download it from [rustup](https://rustup.rs/)

Also it is assumed that you have a container runtime installed locally, such as Docker or Podman. If you do not have it, you can install it from [here](https://docs.docker.com/get-docker/). If you are using Podman, you can install it from [here](https://podman.io/getting-started/installation).
{{< /admonition >}}

The goal is to create a docker container for a PostgreSQL database, and then connect to it from our tests.

Add these dependencies to your ```cargo.toml``` file:

```toml
[dependencies]
sqlx = { version = "0.7.1", features = ["runtime-tokio", "postgres"] }
testcontainers = "0.14.0"
tokio = { version = "1.32.0", features = ["full"] }
```

The ```sqlx``` dependency is used to connect to the database, and the ```testcontainers``` dependency is used to create the docker container.

Now, let's create a simple test that connects to the database:

```rust
use sqlx::postgres::PgPoolOptions;
use testcontainers::{clients, images};

#[tokio::test]
async fn deploy_postgres() -> Result<(), sqlx::Error> {
    let docker_client = clients::Cli::docker();
    let postgres = docker_client.run(images::postgres::Postgres::default());
    postgres.start();
    let port = postgres.get_host_port_ipv4(5432);
    let connection_string = format!("postgres://postgres:postgres@localhost:{}/postgres", port);
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&connection_string)
        .await?;
    let row: (i64,) = sqlx::query_as("SELECT $1")
        .bind(150_i64)
        .fetch_one(&pool)
        .await?;
    assert_eq!(row.0, 150);
    Ok(())
}
```

Let's go through the code step by step:

```rust
let docker_client = clients::Cli::docker();
let postgres = docker_client.run(images::postgres::Postgres::default());
postgres.start();
```

In this chunk of code, we define the container client, in this case its docker, if you are using Podman, you can use ```clients::Cli::podman()```. Then we define the container that we want to run, in this case it is a PostgreSQL container, but you can use any container you want. Finally, we start the container. Optionally, it is possible to use a custom Dockerfile and specify a waiting time before the container is ready.

```rust

let port = postgres.get_host_port_ipv4(5432);
let connection_string = format!("postgres://postgres:postgres@localhost:{}/postgres", port);
let pool = PgPoolOptions::new()
    .max_connections(5)
    .connect(&connection_string)
    .await?;
```

In this chunk of code, we get the port of the container, and then we create a connection string to connect to the database. Finally, we create a connection pool to the database.

```rust
let row: (i64,) = sqlx::query_as("SELECT $1")
    .bind(150_i64)
    .fetch_one(&pool)
    .await?;
assert_eq!(row.0, 150);
```

Finally, we execute a simple query to the database, and we assert that the result is correct.

## Running on CI with GitHub Actions

It is possible to run the tests on CI, and it is very easy to do. I will show you how to do it with GitHub Actions, but it is very similar in other CI systems.

```yaml
name: Tests
on:
  pull_request:
    branches:
      - main
env:
  CARGO_TERM_COLOR: always

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        architectures:
          - linux/amd64
    steps:
      - name: Check out code
        uses: actions/checkout@v4
      - name: Set up Docker Qemu
        uses: docker/setup-qemu-action@v2.2.0
      - name: Setup Docker Buildx
        uses: docker/setup-buildx-action@v2.10.0
      - name: Set up Rust
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
          override: true
      - uses: extractions/setup-just@v1
      - name: Setup nextest
        uses: taiki-e/install-action@nextest
      - uses: Swatinem/rust-cache@v2
      - name: List tests
        run: cargo nextest list
      - name: Run tests
        run: cargo nextest run

```

Some notes:

The ```CARGO_TERM_COLOR``` variable is used to enable colors in the logs, and the ```rust-cache``` action is used to cache the dependencies. The ```nextest``` action is used to run the tests, it is a wrapper around the ```cargo test``` command, and it is used to run the tests in parallel.

## Conclusion

Testcontainers is a great tool for integration testing, and it is very easy to use. It is available for many languages, and it is very similar in all of them. I hope you enjoyed this post, and I hope you will try it out.

Have a look to the code in my [GitHub](https://github.com/adrianvillanueva997/testcontainers) repository
