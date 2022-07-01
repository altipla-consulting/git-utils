
build:
	npm ci

release:
	npm run lint
	mkdir -p dist
	vsce package -o dist
