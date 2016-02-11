#!/bin/bash

# reconfigure database connection
sudo sed -i "s/@127.0.0.1/@192.168.50.1/"  /vagrant_data/web/server/config/databaseConfig.js

# reconfigure test data
sudo sed -i "s|./db/sql/create-schema.sql|/vagrant_data/db/sql/create-schema.sql|"  /vagrant_data/web/server.tests/config/testDataConfig.js

# a hack to make node running in the background
sudo screen -d -m node /vagrant_data/web/server/index.js

jasmine-node /vagrant_data/web/server.tests/