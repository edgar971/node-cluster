# Node Cluster
Experimenting with the Node Cluster module. 

This is a simple pub/sub project that uses the Node cluster module to create many subscribers. 

## Running App
1. Install all NPM deps: `yarn`
1. Download Docker images: `docker-compose pull`
1. Start Docker services: `docker-compose up -d`
1. Start the main consumer app: `yarn start:consumer`
1. Publish some messages to the queue: `yarn start:publisher`
