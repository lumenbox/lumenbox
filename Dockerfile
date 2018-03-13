# base image
FROM node:9

# copy the app
WORKDIR /usr/src/app
COPY . /usr/src/app/

# build the client app
WORKDIR /usr/src/app/client-web
RUN yarn install
RUN NODE_ENV=production yarn build

# prepare the server
WORKDIR /usr/src/app/server
RUN yarn install

# configure the runtime
ENV NODE_ENV=production
ENV PORT=3000
CMD [ "/usr/local/bin/node", "/usr/src/app/server/src/index.js" ]
EXPOSE 3000
