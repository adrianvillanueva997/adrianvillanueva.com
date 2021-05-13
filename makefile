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
	gow run server.go

run:
	go run server.go
test:
	go test -cover

test-dev:
	gow test -cover
