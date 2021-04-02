
build:
	npm ci

release:
	@mkdir -p dist
	@vsce package -o dist
