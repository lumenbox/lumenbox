# LumenBox

```
# build the docker image
$ docker build -t lumenbox .

# run the docker image
$ docker run --name lumenbox-app -p 3000:3001 -e NODE_ENV=production -e DB_HOST=hostname -e DB_NAME=dbname -e DB_USER=username -e DB_PASSWORD=password lumenbox

# get the docker ip
$ docker-machine ip default
```
