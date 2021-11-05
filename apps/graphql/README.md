
Project Graphql (Under construction)
- 
**Completed scaffolding required for graphQL**
- Create the required env files under `/config/development/.env`
- Make sure to execute appropriate **nodemon.json** file
- Run npm run `start:nodemon:dev:graphql` to start the app in watchable mode
- ###### Run `npm run build:graphql:dev` to build the app in a dev environemnt
- Then build docker using the below commands
- Once docker is built, run it using `docker run --env INTERNAL_PORT=3001 --env-file ./apps/graphql/src/config/development/.env -p $
  {INTERNAL_PORT}:3001 --name=ci-test <img-name>`


**Under Consideration**
- Planning to use prisma as the default graphql with apollo engine
- Call necessary modules based on usecase

**Note**: To run docker , use the command - `docker build -f apps/graphql/src/deployment/docker-manifest/Dockerfile -t <img-name> .`
To cd into a docker image without creating a container -  `docker run -it --rm --entrypoint /bin/sh <img-name>`
