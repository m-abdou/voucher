FROM node:12.16
WORKDIR /var/code/
ADD . /var/code/
RUN npm install
ENTRYPOINT ./startup.sh