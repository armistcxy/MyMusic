run: db api

api:
	uvicorn app.main:api --port 8000 --workers 4 --reload
db:
	docker run -d \
		--name postgres \
		-e POSTGRES_USER=dev \
		-e POSTGRES_PASSWORD=123456789 \
		-e POSTGRES_DB=fapi \
		-v /var/lib/postgresql/data \
		-p 5432:5432 \
		postgres:14-alpine

dropdb:
	docker stop postgres
	docker remove postgres

.PHONY: api run db dropdb