
# Housify

![Node.js CI](https://github.com/MYavuzYAGIS/Housify/blob/master/.github/workflows/badge.svg)
![Version](https://github.com/MYavuzYAGIS/Housify/blob/master/.github/workflows/version.svg)
![Maintained](https://github.com/MYavuzYAGIS/Housify/blob/master/.github/workflows/maintain.svg)




## Getting started

Install all dependencies with yarn or npm. This is the same for both client and server project.
```cli
yarn install
```

### Server

A [Apollo Server](https://www.apollographql.com/docs/apollo-server) with [MongoDB](https://www.mongodb.com) backend 
for storing rental houses. 

All server code is located in the  `/server` folder.

#### Configure your environment variables

Create a environment variable, `.env` file in the `/server` folder:

```env
PORT=9000
DB_USER=<username>
DB_USER_PASSWORD=<password>
DB_CLUSTER=<mongodb cluster>
G_CLIENT_ID=<Google OAuth client id>
G_CLIENT_SECRET=<Google OAuth API secret>
PUBLIC_URL=<http://localhost:3000>
SECRET=<some secret text>
NODE_ENV=<development for local dev>
```

After you have configured your variables you can seed with some mock data

```cli
yarn seed
```

#### Run & build

Start the server with yarn.
```cli
yarn start
```

In development mode you can access the GraphQL Playground on URL [http://localhost:9000/api/](http://localhost:9000/api/)


Create a production build with yarn.
```cli
yarn build
```

### Client

A React [Apollo Client](https://www.apollographql.com/docs/react) that display rental listings.

All client code is located in the  `/client` folder.

Start the client with yarn.
```cli
yarn start
```

The client uses [Apollo CLI](https://www.apollographql.com/docs/devtools/cli/) to generate types from the server API.

Read the server API schema and stores it locally to the client.
```cli
yarn codegen:schema
```

Reads the local schema file and generate types where GraphQL queries are defined.
```cli
yarn codegen:generate
```


## Technologies used:
### Client:
- React
- React Router DOM
- GraphQL with Apollo Client
- Ant Design
- Typescript

### Server:
- Node js
- Express
- GraphQL with Apollo Server
- Mongodb
- OAuth 2.0 with google
- Google People's API
- Google Geocoding API
- Cloudinary
- Stripe




