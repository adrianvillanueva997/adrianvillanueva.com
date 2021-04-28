init:
	go mod download
	
lint:
	golangci-lint run

sec:
	gosec ./...

build:
	go build -o app .

docker-build:
	docker build -t adrianvillanueva997 .

run-dev:
	gow run main.go

run:
	go run main.go

test:
	go test -cover

test-dev:
	gow test -cover