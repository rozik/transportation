#!/bin/bash

sudo apt-get update && sudo apt-get -y upgrade
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs screen
sudo npm install jasmine-node -g