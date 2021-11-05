FROM node:14-alpine3.13 as docker-build
LABEL app.id="ap0001" app.name="ci-graphAPI" app.department="core"
# RUN apk update && apk add --upgrade curl \
#     && rm -rf /var/cache/apk/*
RUN apk update && apk add --update git openssh

RUN mkdir ci
COPY package*.json /ci/
COPY . /ci/
RUN pwd && ls -lta

COPY  ./target/ /ci/

RUN pwd && ls -lta

USER root

RUN addgroup -S appUser && adduser --disabled-password -S -G appUser appUser

WORKDIR /ci
RUN npm i -g pm2 @nestjs/cli@8.0.2
RUN npm cache clear --force && npm i
RUN nest build graphql
USER appUser

RUN pwd && ls -la
EXPOSE ${INTERNAL_PORT}
ENTRYPOINT [ "pm2-runtime", "apps/graphql/src/deployment/pm2/ecosystem.config.js" ]