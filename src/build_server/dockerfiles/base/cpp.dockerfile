FROM ubuntu

RUN apt-get -y update
RUN apt-get install -y git make cmake g++ libboost-all-dev