# Francis' LendSqr Nodejs Screening Test
***
## Description
Francis' LendSqr Screening Test Submission -- Financial Technology Platform that supports financial services and manages transactions of a user. Built with NodeJs, KnexJs & MySQL Database
* * *

### Built With

* NodeJs
* ExpressJs
* KnexJs
* MySql 

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
## Migrations

* users
* accounts
* payments
* transactions

## API Documentation
### Authentication 
#### `POST /api/register`
*Note: This endpoint registers a user and creates a financial account for the user(comprising of his/her unique account number etc)*

##### Request
> Body: {  
> first_name: String  
> last_name: String  
> phone_number: String  
> password: String  
> }

##### Response
###### Success
HTTP **200** status code.
> Body: {  
> success: Boolean
> message: String
> }
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
HTTP **200** status code.
> Body: {  
> success: Boolean
> message: String  
> token : String
> }
*Note: token is the JSON Web Token*

###### Failure
This returns a failure message and an HTTP **400** code.
> Body: {  
> message: String  
> }

#### `POST /api/account/set-pin`
*Note: User must set his/her account pin to carry out any transaction*

##### Request
> Body: {  
> pin: String  
> confirm_pin: String  
> }

##### Response
> Body: {  
> success: Boolean
> message: String  
> }

#### `POST /api/account/fund`
##### Request
> Body: {  
> amount: Number    
> }

##### Response
> Body: {  
> success: Boolean
> message: String  
> }

#### `POST /api/account/transfer`
##### Request
> Body: {  
> amount: Number  
> recipient_account_number: String
> sender_account_pin: String  
> }

##### Response
> Body: {  
> success: Boolean
> message: String  
> }

#### `POST /api/account/withdraw`
##### Request
> Body: {  
> amount: String  
> account_pin: String  
> }

##### Response
> Body: {  
> success: Boolean
> message: String  
> }

#### `GET /api/user/profile`
##### Response
###### Success
HTTP **200** status code.
> Body: {  
> success: Boolean
> message: String  
> result : Object
> }
###### Failure
This returns a failure message and an HTTP **400** code.
> Body: {  
> message: String  
> }

#### `GET /api/account/info`
##### Response
###### Success
HTTP **200** status code.
> Body: {  
> success: Boolean
> message: String  
> result : Object
> }
###### Failure
This returns a failure message and an HTTP **400** code.
> Body: {  
> message: String  
> }

#### `GET /api/payments`
##### Response
###### Success
HTTP **200** status code.
> Body: {  
> success: Boolean
> message: String  
> result : Object
> }
*Note: result contains array objects of payments with pagination*
###### Failure
This returns a failure message and an HTTP **400** code.
> Body: {  
> message: String  
> }


#### `GET /api/transactions`
##### Response
###### Success
HTTP **200** status code.
> Body: {  
> success: Boolean
> message: String  
> result : Object
> }
*Note: result contains array objects of transactions with pagination*
###### Failure
This returns a failure message and an HTTP **400** code.
> Body: {  
> message: String  
> }