# Server rest API to store recipes

## Running

You must have docker and docker compose

run

```bash
docker compose up
```

This will start postgres and nodejs server.

You can test the server by running the http requests found ni api-calls-vsc.http (you will need to have REST Client (Huachao Mao) installed)

The first request generates a JWT auth. The remaining requests will use this.

If you are using JetBrains you can use the api-calls.http file and run all requests, you will need to select the dev environment.

Now that we have a working server let try load testing

Checkout branch 'load-testing' to see that config

