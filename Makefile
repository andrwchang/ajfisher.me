.PHONY: help lint test

help:
	@echo "install:         Install all the parts needed for local dev"
	@echo "install-site:    Install all the parts needed for the site"
	@echo "clean:           Completely clean everything up"
	@echo "clean-site:      Clean node_modules for site only"
	@echo "clean-meta:      Clean node_modules for meta only"
	@echo "start:           Run the development environment"
	@echo "serve:           Serve web application"
	@echo "test:            Run tests."
	@echo "pre-commit:      Run lint for site."
	@echo "build:           Build web application"
	@echo "deploy-app:      Deploy the front end application"

clean-site:
	@echo 'Cleans all of the api files up'
	cd ./site  && gatsby clean && rm -rf node_modules && rm -rf coverage
	cd ./site/plugins/gatsby-transformer-remark-tags && rm -rf node_modules
	@echo 'Files cleaned up'

clean-meta:
	@echo 'Cleans all of the app files up'
	rm -rf node_modules
	@echo 'Files cleaned up'

clean: clean-site clean-meta

install-site:
	@echo 'Installs the site dependencies'
	cd ./site && npm install
	cd ./site/plugins/gatsby-transformer-remark-tags && npm install
	@echo 'Site dependencies installed'

install: install-site
	npm install

start:
	cd ./site && gatsby develop -H 0.0.0.0

serve:
	cd ./site && gatsby serve

pre-commit:
	echo "Not implemented"

test:
	cd ./site && npm run test

build:
	echo "Not implemented"
	@echo "build:									Build web application"

deploy-app:
	echo "Not implemented"
	@echo "deploy-app:								Deploy the front end application"
