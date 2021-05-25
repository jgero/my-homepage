# Environment setup

Both the production and the development environments use pods to start the set of containers that
are needed for the task. This basically functions like a docker-compose, just the "podman" way.

Such a pod has the same configuration format like Kubernetes pods and uses YAML. Setting this up
with podman does not require you to know the Kubernetes config syntax. Podman can export the current
setup of a running pod in this format with `podman generate kube my-webpage-dev >
my-webpage-dev.yaml` and run it again with `podman play kube my-webpage-dev.yaml`.

## Development

The development pod consists of the sapper development server. Currently using a pod may be overkill
when I'm only running a single container inside it, but the idea is, that later when I maybe add a
database or more services that need to communicate with each other, this is way faster to set up.

### Useful commands

- `podman pod restart my-webpage-dev` to restart all the containers inside the pod
- `podman container restart my-webpage-dev-sapper` to restart only one specific container
- `podman contianer logs my-webpage-dev-sapper` to get all the logs from a specific container
- `podman contianer attach my-webpage-dev-sapper` to attach to a container and get all the logs from
  it

