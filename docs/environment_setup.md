# Environment setup

Both the production and the development environments use pods to start the set of containers that
are needed for the task. This basically functions like a docker-compose, just the "podman" way.

Such a pod has the same configuration format like Kubernetes pods and uses YAML. Setting this up
with podman does not require you to know the Kubernetes config syntax. Podman can export the current
setup of a running pod in this format with `podman generate kube my-webpage-dev >
my-webpage-dev.yaml` and run it again with `podman play kube my-webpage-dev.yaml`.

## Development

The development pod consists of the sapper development server and the go application. Currently
using a pod may seem like an overkill and cumbersome when I'm only running these simple containers
that could run on their own, but the idea is, that later when I maybe add a database or more
services that need to communicate with each other, this is way faster to set up.

### Starting the containers manually

Setting up a pod in podman is more or less trivial, but the commands to start the containers with
the mounts and ports can have a few nice extras. For example a anonymous volume for `node_modules`
so `npm install` has cache and does not have to be run as often and I don't have `node_modules`
littered all around my system. To achieve this I use this command:

```
podman run \
	--rm \
	--tty \
	-v $(PWD)/src/:/app/src/:z \
	-v $(PWD)/static/:/app/static/:z \
	-v $(PWD)/rollup.config.js:/app/rollup.config.js:z \
	--mount type=image,source=my-webpage:dev,destination=/app/src/node_modules/,rw=true \
	-p 3000:3000 \
	-p 10000:10000 \
	my-webpage/sapper:dev
```

> Note that the anonymous (type image) volume comes last and thus is layered on top of the
> `$(PWD)/src/` volume and prevents the `node_modules` from being mounted into the host fs.


### Useful commands

- `podman pod restart my-webpage-dev` to restart all the containers inside the pod
- `podman container restart my-webpage-dev-sapper` to restart only one specific container
- `podman contianer logs my-webpage-dev-sapper` to get all the logs from a specific container
- `podman contianer attach my-webpage-dev-sapper` to attach to a container and get all the logs from
  it

### Cleaning up

Cleaning up all the containers and images is in theory pretty straight forward. Just delete the pod
and all the images that are used there. The problem is that podman (like docker) does not offer some
kind of regex matching on the image delete command. Thus some more creativity and searching in the
internet is necessary and it lead me to this solution:

```
podman image ls \
	| grep "my-webpage.*dev" \
	| tr -s ' ' \
	| cut -d ' ' -f 3 \
	| xargs -I [] podman image rm []
```

It may look a bit complicated but it's actualy not doing anything wild. First I grep all images that
have a name containing "my-webpage" and the tag "dev". After that all the whitespaces are truncated
down to just one. With cut I select only the image ID of the previously matched images and with
xargs the actual removal of the images happens.

## Production

The production image is comprised of the binary of the go server and the "exported" sapper app as
static files. With extra compilation flags the go application can be compiled to a binary that can
run in a container "FROM scratch". Combined with the compiler flag to only build for linux targets
results in an extremely small container. This container is wrapped into a pod, later it has an nginx
reverse proxy as well in it to handle the https stuff, but that is not included yet.

