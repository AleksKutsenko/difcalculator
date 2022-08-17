install:
			npm ci


gendiff:
			node bin/gendiff.cjs


publish:
			npm publish --dry-run


make lint:
			npx eslint .
