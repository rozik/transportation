#!/bin/bash

mkdir -p ./infrastructure/db/data/db
cp -r ./db/ ./infrastructure/db/data/db
cd ./infrastructure/db
vagrant plugin install vagrant-vbguest
vagrant up