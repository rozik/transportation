#!/bin/bash

vagrant box add ubuntu-14.04-amd64 https://github.com/kraksoft/vagrant-box-ubuntu/releases/download/14.04/ubuntu-14.04-amd64.box

./db-up.sh
./web-up.sh