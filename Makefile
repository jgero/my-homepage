.PHONY: portfolio_run portfolio_build space_run space_build main_run main_build

#-------------------------------------------------------------------------------#
#---------------- FUNCTIONS TO BUILD AND RUN DEV IMAGES ------------------------#
#-------------------------------------------------------------------------------#
# function for building a dev image
build_docker = docker build \
									-t my-webpage/$(1):dev \
									-f ./docker/dev.Dockerfile \
									--build-arg TARGET=$(1) \
									.
# function for running a dev image
run_docker = docker run \
									--rm \
									--tty \
									-v $(PWD)/component-lib/:/app/component-lib/ \
									-v $(PWD)/$(1)/src/:/app/main/src/ \
									-v $(PWD)/$(1)/static/:/app/main/static/ \
									-v $(PWD)/$(1)/rollup.config.js:/app/main/rollup.config.js \
									-p 3000:3000 \
									-p 10000:10000 \
									my-webpage/$(1):dev
# function for building a prod image
build_docker_prod = docker build \
									-t my-webpage/$(1):prod \
									-f ./docker/prod.Dockerfile \
									--build-arg TARGET=$(1) \
									.

#-------------------------------------------------------------------------------#
#----------------- TARGETS TO BUILD AND RUN DEV CONTAINERS ---------------------#
#-------------------------------------------------------------------------------#
portfolio: portfolio_build portfolio_run
portfolio_build:
	$(call build_docker,portfolio)
portfolio_run:
	$(call run_docker,portfolio)
portfolio_build_prod:
	$(call build_docker_prod,portfolio)

space: space_build space_run
space_build:
	$(call build_docker,space)
space_run:
	$(call run_docker,space)
space_build_prod:
	$(call build_docker_prod,space)

main: main_build main_run
main_build:
	$(call build_docker,main)
main_run:
	$(call run_docker,main)
main_build_prod:
	$(call build_docker_prod,main)
