# LumenBox

```
# build the docker image
$ docker build -t lumenbox .

# run the docker image
$ docker run --name lumenbox-app -p 3000:3000 -e DB_NAME=dbname -e DB_USER=username -e DB_PASSWORD=password lumenbox

# get the docker ip
$ docker-machine ip default
```
