JS_FILES := $(shell find . -name "*.js" -not -path "./node_modules/*")

format:
	@./node_modules/.bin/prettier --write $(JS_FILES)
