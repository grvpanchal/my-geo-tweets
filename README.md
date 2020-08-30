# My Geo Tweets

This react app is designed to collect tweets as per the location and query. The App includes following features:

- Google Maps to represent the location
- Responsive Design
- Autocomplete using Google Places API
- Search for tweets of a location with 100 km radius

## Tech Stack
Following technologies have been used to build up this repository:

- JavaScript Library - React
- Router - React Router
- State Management - Redux
- Async Middleware - Redux SAGA
- UI Framework - Material UI
- Unit Testing - Jest
- Backend - Node / Express / MongoDB
- Third Party API - Google, Twitter

## Setup
Set .env file
```sh
DB_HOST="localhost"
DB_PORT=27017
DB_NAME="twitter"

MY_SECRET="mysupersecretpassword"
HOST_DOMAIN="localhost"
HOST_PORT=3002
TW_HOSTNAME="https://api.twitter.com"
TW_CONSUMER_KEY="..."
TW_CONSUMER_SECRET="..."
TW_ACCESS_TOKEN="..."
TW_ACCESS_TOKEN_SECRET="..."
```

Set ./src/config.js
```js
const config = {
  apiEndpoint: 'http://localhost:3002',
  siteTitle: 'My Geo Tweets',
  googleMapsKey: '...',
};

export default config;

```

In the project directory, you can run:

```sh
npm install
npm start
```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

To start the backend execute following command:
```sh
npm run start:server
```

If you dont have mongoDB installed on the system, use docker and run mongoDB image with following:
```sh
docker-compose up
```

## Testing

```sh
npm test
```

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Building
```sh
yarn build
```

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!