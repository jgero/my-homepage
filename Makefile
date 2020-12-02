.PHONY: portfolio_run portfolio_build space_run space_build main_run main_build

#-------------------------------------------------------------------------------#
#---------------- FUNCTIONS TO BUILD AND RUN DEV IMAGES ------------------------#
#-------------------------------------------------------------------------------#
# function for building a dev image
build_docker = docker build \
									-t my-webpage/$(1):dev \
									-f ./docker/dev.Dockerfile \
									./$(1)
# function for running a dev image
run_docker = docker run \
									--rm \
									--tty \
									-v $(PWD)/$(1)/src/:/app/src/ \
									-v $(PWD)/$(1)/static/:/app/static/ \
									-v $(PWD)/$(1)/rollup.config.js:/app/rollup.config.js \
									-p 3000:3000 \
									-p 10000:10000 \
									my-webpage/$(1):dev

#-------------------------------------------------------------------------------#
#----------------- TARGETS TO BUILD AND RUN DEV CONTAINERS ---------------------#
#-------------------------------------------------------------------------------#
portfolio: portfolio_build portfolio_run
portfolio_build:
	$(call build_docker,portfolio)
portfolio_run:
	$(call run_docker,portfolio)

space: space_build space_run
space_build:
	$(call build_docker,space)
space_run:
	$(call run_docker,space)

main: main_build main_run
main_build:
	$(call build_docker,main)
main_run:
	$(call run_docker,main)
