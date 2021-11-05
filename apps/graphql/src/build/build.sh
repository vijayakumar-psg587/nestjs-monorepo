#! /bin/bash

echo "### Starting the build"

ENV_DEV="dev"
ENV_PROD="PROD"

input_param_validate_fn() {
    echo 'Number of parameters should be atleast 1. No value is passed'
    exit 1
}

common_err_fn() {
    echo 'Error occured ${1:- Unknown error}'
    exit 1
}

build_fn() {
    echo '###Getting value for build'
    if [ $1 = 'dev' ]
    then
        echo '### Build for dev/staging' ${NODE_ENV}
        npm run build:scaffold:graphql:dev
    elif [ $1 = 'prod' ]
    then
        echo '### Build for prod'
        npm run build:scaffold:graphql:prod
    else
        common_err_fn 'Provided input is invalid'
    fi
}

echo '### First installing the dependancies'
# npm install

echo '### Now building the artifact'
# if [ '$#' ne 1 ]
# then
#     input_param_validate_fn
# else
#     echo '### Calling the build function'
    build_fn ${NODE_ENV}
# fi

echo '### Creating target folder and copying'

if [ -d 'target' ]
then
    rm -rf target
    mkdir target
    mkdir target/dist
    mkdir target/build
    mkdir target/deployment
else
    mkdir target
    mkdir target/dist
    mkdir target/build
    mkdir target/deployment
fi

cp package*.json target/

cp -r dist/apps/graphql target/dist
cp -r ./apps/graphql/src/deployment/* target/deployment
cp -r ./apps/graphql/src/build/* target/build
pwd && ls -lta

echo '###Completed'
