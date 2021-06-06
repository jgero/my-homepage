# Environment setup

Both the production and the development environments use pods to start the set of containers that
are needed for the task. This basically functions like a docker-compose, just the "podman" way.

Such a pod has the same configuration format like Kubernetes pods and uses YAML. Setting this up
with podman does not require you to know the Kubernetes config syntax. Podman can export the current
setup of a running pod in this format with `podman generate kube my-webpage-dev >
my-webpage-dev.yaml` and run it again with `podman play kube my-webpage-dev.yaml`.

## Development

Initially I was using a pod for the development setup, but after some troubles with volumes I
switched back to just starting the containers individually from a shell script.

If I decide in the future to use some kind of database or some services depend on each other, I may
need to consider going back to using pods or some other way of starting multiple containers.

## Production

The production image is comprised of the binary of the go server and the "exported" sapper app as
static files. With extra compilation flags the go application can be compiled to a binary that can
run in a container "FROM scratch". Combined with the compiler flag to only build for linux targets
results in an extremely small container. This container is wrapped into a pod, later it has an nginx
reverse proxy as well in it to handle the https stuff, but that is not included yet.

### Useful commands

- `podman pod restart my-webpage` to restart all the containers inside the pod
- `podman container restart my-webpage` to restart only one specific container
- `podman contianer logs my-webpage` to get all the logs from a specific container
- `podman contianer attach my-webpage` to attach to a container and get all the logs from it

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

