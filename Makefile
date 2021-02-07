#-------------------------------------------------------------------------------#
#-------------------------------- SETUP ----------------------------------------#
#-------------------------------------------------------------------------------#
# set docker as container runtime if nothing else is set
CONTAINER_RUNTIME?=$(CONTAINER_RUNTIME)
#-------------------------------------------------------------------------------#
#---------------- FUNCTIONS TO BUILD AND RUN DEV IMAGES ------------------------#
#-------------------------------------------------------------------------------#
# build a dev image
build_dev = $(CONTAINER_RUNTIME) build \
	-t my-webpage/$(1):dev \
	-f ./$(CONTAINER_RUNTIME)/dev.Dockerfile \
	--build-arg TARGET=$(1) \
	.
# run a dev image
run_dev = $(CONTAINER_RUNTIME) run \
	--rm \
	--tty \
	-v $(PWD)/$(1)/src/:/app/$(1)/src/ \
	-v $(PWD)/$(1)/static/:/app/$(1)/static/ \
	-v $(PWD)/$(1)/rollup.config.js:/app/$(1)/rollup.config.js \
	-p 3000:3000 \
	-p 10000:10000 \
	my-webpage/$(1):dev
#-------------------------------------------------------------------------------#
#--------------- FUNCTIONS TO BUILD AND DEPLOY PROD IMAGES ---------------------#
#-------------------------------------------------------------------------------#
# build a prod image
build_prod = $(CONTAINER_RUNTIME) build \
	-t eu.gcr.io/webpage-jgero/$(1)-page:latest \
	-f ./$(CONTAINER_RUNTIME)/prod.Dockerfile \
	--build-arg TARGET=$(1) \
	.
# push a prod image to gcloud
push = $(CONTAINER_RUNTIME) push eu.gcr.io/webpage-jgero/$(1)-page:latest
# deploy the gcp cloud run services
deploy = gcloud run deploy $(1)-page \
	--image eu.gcr.io/webpage-jgero/$(1)-page:latest \
	--region europe-west1 \
	--platform managed
#-------------------------------------------------------------------------------#
#----------------- TARGETS TO BUILD AND RUN DEV CONTAINERS ---------------------#
#--------- this is the recommended way of developing the pages -----------------#
#-------------------------------------------------------------------------------#
portfolio: portfolio_build portfolio_run
.PHONY: portfolio_build
portfolio_build:
	$(call build_dev,portfolio)
.PHONY: portfolio_run
portfolio_run:
	$(call run_dev,portfolio)

space: space_build space_run
.PHONY: space_build
space_build:
	$(call build_dev,space)
.PHONY: space_run
space_run:
	$(call run_dev,space)

main: main_build main_run
.PHONY: main_build
main_build:
	$(call build_dev,main)
.PHONY: main_run
main_run:
	$(call run_dev,main)
#-------------------------------------------------------------------------------#
#---------------- TARGETS TO BUILD AND DEPLOY PROD IMAGES ----------------------#
#------------ this is supposed to be run in the cloud build --------------------#
#-------------------------------------------------------------------------------#
build: portfolio_build_prod space_build_prod main_build_prod
.PHONY: portfolio_build_prod
portfolio_build_prod:
	$(call build_prod,portfolio)

.PHONY: space_build_prod
space_build_prod:
	$(call build_prod,space)

.PHONY: main_build_prod
main_build_prod:
	$(call build_prod,main)

push: build portfolio_push space_push main_push
.PHONY: portfolio_push
portfolio_push:
	$(call push,portfolio)
.PHONY: space_push
space_push:
	$(call push,space)
.PHONY: main_push
main_push:
	$(call push,main)

deploy: portfolio_deploy space_deploy main_deploy
.PHONY: portfolio_deploy
portfolio_deploy:
	$(call deploy,portfolio)
.PHONY: space_deploy
space_deploy:
	$(call deploy,space)
.PHONY: main_deploy
main_deploy:
	$(call deploy,main)

