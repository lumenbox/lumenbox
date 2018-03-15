# Lumenbox

Free and secure Stellar Lumen Federation Service

## Development

### Server

Create a postgres database called `lumenbox` and initialise with `server/src/db/schema.sql`

```
cd client-web
yarn install
yarn start
```

config settings can be found in `/server/src/config.js`

### Client Web

```
cd server
yarn install
yarn start
```

config settings can be found in `/client-web/src/config.js`

## Docker

### Building and running

```
# build the docker image
$ docker build -t lumenbox .

# run the docker image
$ docker run --name lumenbox-app -p 3000:3001 -e NODE_ENV=production -e DB_HOST=hostname -e DB_NAME=dbname -e DB_USER=username -e DB_PASSWORD=password lumenbox
```

### All environment variables and their defaults

```
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lumenbox
DB_USER
MAIL_HOST
MAIL_PORT=465
MAIL_USER
MAIL_PASSWORD
```
