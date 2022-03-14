# Enter the folder

cd my-api-challenge

# To install the dependencies:

yarn install or npm install

# run a dev mode

yarn dev or npm run dev

# run tests

yarn test or npm run test

## // API routes //

# Create a request

Method: POST
Router: /api/update

Example JSON Body
{"userId": "1", "name": "Ricardo"}

# Read All Data Request

Method: GET
Router: /api/read

# Last 10min requests of user

Method: GET
Router: /api/readlast/user/:userId

# All requests of user

Method: GET
Router: /api/read/user/:userId
