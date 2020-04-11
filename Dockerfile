FROM node:11.4
WORKDIR /var/code/
ADD . /var/code/
RUN npm install
ENTRYPOINT ./startup.sh