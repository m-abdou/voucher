FROM node:11.4
WORKDIR /var/code/
ADD . /var/code/
EXPOSE 9090
ENTRYPOINT ./startup.sh