---
title: "My setup"
date: 2023-07-16
draft: false
description: "How my server is setup and how I use it"
tags: ["selfhost", "servers", "software"]
categories: ["programming", "linux", "servers"]

lightgallery: true
---

## Intro

I have been self-hosting for a while now, and I have been asked a few times how I do it. So I decided to write a post about it. This post will be about my server setup, and how I use it. I will not go into detail about how to setup the services, but I will link to the documentation for each service.

## Context

I started with a raspberry pi at home to self-host some telegram bots that I made myself for a group of friends, I made everything by hand and it quickly became a boring chore instead of something that I wanted to do for fun. Eventually I wanted to host some web services like this website, but I did not want to spend my time designing and tinkering around with networking at home (I hate networking).

When I needed to move to the cloud I started with a cheap 1$ vps from [scaleway](https://www.scaleway.com/en/) because I just needed to host some MySQL databases for some university projects, and I quickly realized that I wanted more resources. I upgraded it to a VPS from [contabo](https://contabo.com/en/) with 6 cores and 16GB of ram, and I have been using it for some years now. I have been very happy with it, and I have not had any issues with it.

## Server setup

I use Docker to deploy all my services because it allows me to have separate environments for each service, and it makes it easy to update and manage them. I use [docker-compose](https://docs.docker.com/compose/) to manage my docker containers, and I use [traefik](https://doc.traefik.io/traefik/) as a reverse proxy to route the traffic to the correct container.

In order to deploy my services I have separate GitHub repositories for each service. Thanks to [GitHub actions](https://github.com/features/actions) I can build/test/lint my projects and later on push the image to [GitHub Container Registry](https://docs.github.com/en/packages/guides/about-github-container-registry) and then deploy it to my server. I used to use [Docker Hub](https://hub.docker.com/) but I switched to GitHub Container Registry because I already use GitHub for everything else, and it is easier to manage everything in one place, and I do not have to worry about the rate limits since everything I do is public.

When I want to deploy a new service I just need to create a new repository, add the GitHub action to build the image and push it to the registry, and then add the docker-compose file to the repository. I can then deploy it to my server with a single command.
To update my services, I installed [ouroboros](https://github.com/pyouroboros/ouroboros), which is a tool that automatically updates docker containers when a new image is available. I have it running as a docker container, and it checks for new images every 30 minutes.

The only thing that I need to do manually is to add the new service to the traefik configuration, but I am working on a way to automate that as well.

Finally, regarding the Operating System, I use [Ubuntu Server](https://ubuntu.com/server) because it is the one that I am most familiar with and I do not really want to be tinkering with the OS. I just want it to work. If I had to choose a different OS I would probably go with [Rocky Linux](https://rockylinux.org/), which is a community fork of CentOS or [Debian](https://www.debian.org/).

## Services

Some of the services/projects that I host are:

- [This website](https://adrianvillanueva.com)
- Telegram bots
- [TeamSpeak3](https://teamspeak.com/en/)
- [Minecraft](https://www.minecraft.net/en-us)
- Gaming servers (CS:GO, TF2, etc)
- [traefik](https://doc.traefik.io/traefik/)

I also have a few services that I use for development:

- [Postgres](https://www.postgresql.org/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [RabbitMQ](https://www.rabbitmq.com/)

## Conclusion

I am very happy with my current setup, and I do not plan to change it anytime soon. I am always looking for new services to host, so if you have any suggestions feel free to contact me.

Ideally I would like to migrate everything to kubernetes and have everything even more automated with [ArgoCD](https://argo-cd.readthedocs.io/en/stable/) or something similar, but I do not have the time to do it right now. Maybe in the future. I will probably write a post about it if I ever do it. Who knows.
My focus right now is to keep developing my projects and keep learning new things.
