#!/bin/bash

cat ./sql/create-db.sql | sudo -u postgres psql
cat ./sql/create-schema.sql | sudo -u postgres psql -d :db_name:
cat ./sql/populate-test-data.sql | sudo -u postgres psql -d :db_name:
