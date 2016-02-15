#!/bin/bash

mkdir -p ./infrastructure/webservice/data/db/sql
cp ./db/sql/create-schema.sql ./infrastructure/webservice/data/db/sql
cp ./db/sql/populate-test-data.sql ./infrastructure/webservice/data/db/sql

mkdir -p ./infrastructure/webservice/data/web/server
cp -r ./server/ ./infrastructure/webservice/data/web/server

mkdir -p ./infrastructure/webservice/data/web/server.tests
cp -r ./server.tests/ ./infrastructure/webservice/data/web/server.tests

cd ./infrastructure/webservice
vagrant up