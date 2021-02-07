# jgero.me webpage

This project is composed of multiple pages for the main domain and multiple subdomains.

## develop, build and run

The [Makefile](https://github.com/jgero/my-webpage/blob/main/Makefile) contains separate rules to build and run development and production versions of the pages. By setting the `CONTAINER_RUNTIME` environment variable it is possible to specify a container runtime. The rules were tested for podman and docker, so one of these is recommended. Defaults to docker.

With the rules `main`, `portfolio` and `space` development servers for the respective webpages are started. The `build` rule builds production versions of all the pages, with `PAGENAME_build_prod` a specific production image is built. There are also the rules `push` and `deploy` which push and deploy the images to gcp, but these are not meant to be run manually, only in CI by the cloudbuild.

