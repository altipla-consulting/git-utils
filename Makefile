
build:
	npm ci

release:
	@mkdir -p dist
  @vsce package -o dist

major:
	@vsce publish major

minor:
	@vsce publish minor

patch:
	@vsce publish patch
