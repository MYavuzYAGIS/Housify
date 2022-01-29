# IMPORTANT NOTE WRT src/lib/api/

Normally I created these custom hooks and query/mutate functions in order to interact with the GraphQL server.
However, with the introduction of `Apollo Client` to the frotnend, I can now use the `useQuery` and `useMutation` that is provided by the `@apollo/client` library.

Hence, I do not need the content of this folder and recursively whatever is inside it.

Nevertheless, I will keep this folder in case I need to use it in the future or to keep as reference.
