install:
			npm ci


gendiff:
			node bin/gendiff.js


publish:
			npm publish --dry-run


make lint:
			npx eslint .

test: 
			npm jest

test-coverage:
			npm test -- --coverage --coverageProvider=v8
