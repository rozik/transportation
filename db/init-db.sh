#!/bin/bash

cd `dirname "$0"`

chmod +x ./preprocess-import-scripts.sh
./preprocess-import-scripts.sh

chmod +x ./load-db.sh
./load-db.sh