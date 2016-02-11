#!/bin/bash

# This script should take credentials from somewhere (for instance from environment variables).
sed -i "s/:db_user:/test_user/g;s/:db_name:/test_database/g;s/:db_password:/test_password/g" ./sql/create-db.sql
sed -i "s/:db_user:/test_user/g;s/:db_name:/test_database/g;s/:db_password:/test_password/g;s/:db_host:/127.0.0.1/g" ./load-db.sh