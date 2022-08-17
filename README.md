# Francis' LendSqr Nodejs Screening Test
***
## Description
Francis' LendSqr Screening Test Submission -- Financial Technology Platform that supports financial services and manages transactions of a user. Built with NodeJs, KnexJs & MySQL Database
* * *

## Links

- Github Repo Link : https://github.com/soundx-code/lendsqr-nodejs-task
- Backend Server: https://francis-lendsqr-nodejs-test.herokuapp.com/

## Installation

Use the package manager [npm](https://www.npm.com)

```
npm install
```

Create an .env file in the root directory. It should contain these env variables;
 
```
PORT=4000
NODE_ENV=development
HOST=localhost
APP_URL=http://localhost:4000
APP_SECRET_KEY=

# DATABASE DETAILS
HOST=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_PORT=
```

Run Knexjs database migration

```
knex migrate:latest
```

## Usage

```js
npm start

```

## API Documentation
### Authentication 
#### `POST /api/register`
##### Request
> Body: {  
> phone_number: String  
> password: String  
> }
##### Response
###### Success
This request returns a ***signed*** JWT that shall be stored on the client-side (e.g., local storage or a cookie) and an HTTP **200** code.
> Body: {  
> message: String
> token: String  
> }
*Note: token is the JSON Web Token*
###### Failure
This returns a failure message and an HTTP **400** code.
> Body: {  
> message: String  
> }

#### `POST /api/login`
##### Request
> Body: {  
> phone_number: String  
> password: String  
> }
##### Response
###### Success
This request returns a ***signed*** JWT that shall be stored on the client-side (e.g., local storage or a cookie) and an HTTP **200** code.
> Body: {  
> message: String
> token: String  
> }
*Note: token is the JSON Web Token*
###### Failure
This returns a failure message and an HTTP **400** code.
> Body: {  
> message: String  
> }

#### `POST /api/user/profile`
##### Request
> Body: {  
> phone_number: String  
> password: String  
> }
##### Response
###### Success
This request returns a ***signed*** JWT that shall be stored on the client-side (e.g., local storage or a cookie) and an HTTP **200** code.
> Body: {  
> message: String
> token: String  
> }
*Note: token is the JSON Web Token*
###### Failure
This returns a failure message and an HTTP **400** code.
> Body: {  
> message: String  
> }

#### `POST /api/account/set-pin`
##### Request
> Body: {  
> phone_number: String  
> password: String  
> }
##### Response
###### Success
This request returns a ***signed*** JWT that shall be stored on the client-side (e.g., local storage or a cookie) and an HTTP **200** code.
> Body: {  
> message: String
> token: String  
> }
*Note: token is the JSON Web Token*
###### Failure
This returns a failure message and an HTTP **400** code.
> Body: {  
> message: String  
> }

#### `POST /api/account/info`
##### Request
> Body: {  
> phone_number: String  
> password: String  
> }
##### Response
###### Success
This request returns a ***signed*** JWT that shall be stored on the client-side (e.g., local storage or a cookie) and an HTTP **200** code.
> Body: {  
> message: String
> token: String  
> }
*Note: token is the JSON Web Token*
###### Failure
This returns a failure message and an HTTP **400** code.
> Body: {  
> message: String  
> }

#### `POST /api/account/fund`
##### Request
> Body: {  
> phone_number: String  
> password: String  
> }
##### Response
###### Success
This request returns a ***signed*** JWT that shall be stored on the client-side (e.g., local storage or a cookie) and an HTTP **200** code.
> Body: {  
> message: String
> token: String  
> }
*Note: token is the JSON Web Token*
###### Failure
This returns a failure message and an HTTP **400** code.
> Body: {  
> message: String  
> }

#### `POST /api/account/withdraw`
##### Request
> Body: {  
> phone_number: String  
> password: String  
> }
##### Response
###### Success
This request returns a ***signed*** JWT that shall be stored on the client-side (e.g., local storage or a cookie) and an HTTP **200** code.
> Body: {  
> message: String
> token: String  
> }
*Note: token is the JSON Web Token*
###### Failure
This returns a failure message and an HTTP **400** code.
> Body: {  
> message: String  
> }

#### `POST /api/payments`
##### Request
> Body: {  
> phone_number: String  
> password: String  
> }
##### Response
###### Success
This request returns a ***signed*** JWT that shall be stored on the client-side (e.g., local storage or a cookie) and an HTTP **200** code.
> Body: {  
> message: String
> token: String  
> }
*Note: token is the JSON Web Token*
###### Failure
This returns a failure message and an HTTP **400** code.
> Body: {  
> message: String  
> }

#### `POST /api/transactions`
##### Request
> Body: {  
> phone_number: String  
> password: String  
> }
##### Response
###### Success
This request returns a ***signed*** JWT that shall be stored on the client-side (e.g., local storage or a cookie) and an HTTP **200** code.
> Body: {  
> message: String
> token: String  
> }
*Note: token is the JSON Web Token*
###### Failure
This returns a failure message and an HTTP **400** code.
> Body: {  
> message: String  
> }
