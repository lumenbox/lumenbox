# Lumenbox

```
# build the docker image
$ docker build -t lumenbox .

# run the docker image
$ docker run --name lumenbox-app -p 3000:3001 -e NODE_ENV=production -e DB_HOST=hostname -e DB_NAME=dbname -e DB_USER=username -e DB_PASSWORD=password lumenbox

# get the docker ip
$ docker-machine ip default
```

## All environment variables and their defaults

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
