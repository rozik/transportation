#!/bin/bash

sudo apt-add-repository -y ppa:pitti/postgresql
sudo apt-get update
sudo apt-get install -y postgresql-9.3

sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/"  /etc/postgresql/9.3/main/postgresql.conf
echo -e "host    all    all    all    md5" | sudo tee -a /etc/postgresql/9.3/main/pg_hba.conf
sudo /etc/init.d/postgresql restart