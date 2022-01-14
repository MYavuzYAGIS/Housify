# Newline Part 2

## Creating Client side using React

`npx create-react-app client --typescript`

Currently this is the dependencies for our client side package.json files

```js
 "dependencies": {
    "@testing-library/jest-dom": "^5.11.9",
    "@testing-library/react": "^11.2.5",
    "@testing-library/user-event": "^12.7.1",
    "@types/jest": "26.0.20",
    "@types/node": "14.14.28",
    "@types/react-dom": "17.0.1",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-scripts": "4.0.2",
    "typescript": "4.1.5",
    "web-vitals": "^1.1.0"
  }
```

There are lots of TypeScript declaration files for ts integration with the react app.

So here, we will retrieve and display the items using `fetch()` function. Our client side react app will talk to the GraphQL API we had set up earlier.

under client/src folder we crate:

sections/intex.ts
sections/Listings/Listings.tsx 
sections/Listings/index.ts 



we go to the core file, 

```
import React from 'react';

export const Listings = ()=>{
    return <h2>AirBnb Listings</h2>
};
```

and we export it to the index.ts in the Listings folder(export * from "./Listings";), then we export index.ts in the Listings folder to index.ts in the sections folder.then we export index.ts in the sections folder to index.tsx in the src/ folder (`import {Listings} from "./sections";`
)and render what we exported.


In react, there 2 two types of components.  functional and class based components.

functional components are functions that take props and return jsx. our Listings does not take props but returns jsx which is h2 header.

```jsx
import React from 'react';

interface Props{
    title: string;

}
export const Listings = ({title}:Props)=>{
    return <h2>{title}</h2>
};
```

Lets fetch the data we had in the server

- Invoke a POST or GET HTTP method
 -Most of use POST so will we

- specify content of requiest as application/json
  - graphQL docuiments passed as JSON

-  Reference URL of GraphQL endpoint.

fetch() -native browser method to  nake HTTP requests

we create src/lib folder that 