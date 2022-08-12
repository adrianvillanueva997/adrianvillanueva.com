---
title: "Secrets in docker & Buildkit"
date: 2021-11-27
categories:
  - Code
tags:
  - Devops
slug: docker-secrets
---


Some of the risks of using Docker is that sometimes you may share secret keys such as SSH or another internal keys into one of your container layers.
Even if you build everything in your own selfhosted CI/CD pipeline or export the image to a private registry, the security risk is still there.

How can you avoid this? One of my initial solutions to avoid this problem is by using build-args and pass the SSH key from a local environment variable to a multistage docker
building process. On paper it sounds good right? The building container gets destroyed after finishing the production one and we don't see anything from it. The security risk is
still there because we are passing the key in plain text.

how can we build it in a safer way without exposing anything?

Buildkit! It is a feature not well known for many developers that use docker in their daily work, I heard about it before but I never realised how powerful
it is until I started to use it.

For example, when using multistage building, by default Docker will build one container first and later on the rest 1 by 1. In the end it may sound "okayish" but it is slow. With
buildkit it reads the dependencies between containers and they are built asynchronously until a dependency is met, for example it is needed to copy a bunch of files between containers.

But, how can we enable it? First make sure that the latest version of Docker is installed, after it you can just build everything by using the same commands as you are used to, but
enabling buildkit!

```bash
DOCKER_BUILDKIT=1 docker build .
```

It may be tedious to have to write the buildkit part, but according to the official documentation, it is possible to enable it by default by editing the daemon like this:

```json
{ "features": { "buildkit": true } }
```

But what about sharing secrets? For now, sharing secrets in docker requires to enable docker swarm, however, if you are making use of docker-compose you can pass any local
file as a secret. For example:

```dockerfile
FROM alpine

# shows secret from default secret location:
RUN --mount=type=secret,id=mysecret cat /run/secrets/mysecret
```

The docker-compose file would look like this:

```yaml
version: "3"
services:
  app:
    image: example-app:latest
    secrets:
      - db_password
secrets:
    db_password:
      file: ./db_password.txt
```

In the RUN statement, we are using our secret, after using it, that layer is completly and safely removed from the image build.

It is also possible to pass SSH keys, for example:

```dockerfile
# syntax=docker/dockerfile:1
FROM alpine

# Install ssh client and git
RUN apk add --no-cache openssh-client git

# Download public key for github.com
RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts

# Clone private repository
RUN --mount=type=ssh git clone git@github.com:myorg/myproject.git myproject
```

It combined with a good CICD system can make all the difference in how fast you can actually ship your code, in my current position, switching to Buildkit made it possible to
build and push our images in around 5 minutes! It may still be a lot, but compared to the previous timing, which was around 10 minutes, it is a big improvement.

What do you think about it? I think the future of buildkit looks incredibly interesting!
