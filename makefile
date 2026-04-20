build-app:
	docker build -t fashionhub-local .
run-app:
	docker run --platform linux/arm64 -p 4000:4000 pocketaces2/fashionhub-demo-app:latest
