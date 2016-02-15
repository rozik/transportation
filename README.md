# transportation

## Prerequisites to make the application up and running

* VirtualBox installed
* Vagrant installed

Deployment is tested on MacOS X 10.11.3 with Vagrant 1.7.4 and VirtualBox 5.0.10

## How to start?

Run ./go.sh from the root directory. It will download an appropriate vagrant box and spin-up, configure and deploy two virtual machines. The first one with a database instance and the second one with the application. After application is deployed tests are automatically started.

## Usage

The application is available under the base URL: http://127.0.0.1:8089/api/v1.0/. So, for example, a list of all stations can be obtained by issuing a GET request to the URL http://127.0.0.1:8089/api/v1.0/stations.

In order to reset the database to the default initial state with some basic test data a POST request to the URL http://127.0.0.1:8089/api/v1.0/commands/db/reset can be used.
