FROM ubuntu:18.04

RUN apt-get update && apt-get upgrade -y

# Node setup
RUN apt-get install -y nodejs npm

# Ruby setup
RUN apt-get install -y ruby-full ruby-dev zlib1g-dev
RUN gem update --system

# Python setup
RUN apt-get install -y python3 python3-dev
ENV HOME = "/home"
ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8

RUN apt-get install -y curl
RUN curl --silent https://bootstrap.pypa.io/get-pip.py | python3
RUN python3 -m pip install pipenv