FROM ubuntu:18.04

RUN apt-get update && apt-get upgrade -y


RUN apt-get install -y nodejs npm
RUN apt-get install -y ruby-full ruby-dev zlib1g-dev
RUN apt-get install -y python3 python3-dev python3-pip
RUN apt-get install -y curl

WORKDIR /Blog
COPY . . 


ENV HOME = "/home"
ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8

RUN gem update --system
RUN python3 -m pip install pipenv

RUN npm install
RUN pipenv install --system --deploy
RUN gem install bundler
RUN bundle install

WORKDIR jekyll

EXPOSE 4000

CMD jekyll serve --host 0.0.0.0