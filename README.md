# Employee Management Backend
This is employee management application backend. It is written using nodejs, express and postgresql.

# API Documentation

The API documentation is available [here](https://documenter.getpostman.com/view/20837553/UyxbrVez)

# Requirements
1. Ubuntu 20.04.1 x64
2. Node.js 12.2.0 
3. Postgresql(Database deployed using the services of [ElephantSQL](https://www.elephantsql.com/))

# Server Details
1. Server is running on port 5000.
2. Setup postgresql connection at config/db.js.
3. Run nodejs server and the database will be updated automatically

# Server Setup

1. Install the latest version of nodejs
```
$ curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
$ sudo apt install -y nodejs
```
2. Verify version of nodejs and npm
```
$ nodejs -v
v12.2.0
$ npm -v
6.9.0
```
3. Run the server
```
$ npm start
```
