
interface Body<TVariables>{
    query: string;
    variables?: TVariables; // optional since ? is added.
}

interface Error{
    message:string // error message interface.
}

// TVariables is a generic type that can be any type. especially added to enable post requests and pass id as a variable.
//variable is optional because not all requests will have variables.(like query)

// making a cross-origin request to the server on localhost.
export const server ={
    fetch: async <TDATA =any,TVariables=any>(body:Body<TVariables>) => {
        const res = await fetch('/api',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(body)
        });
        if (!res.ok){
            throw new Error('Failed to fetch from the server.')

        }
        return res.json() as Promise<{data:TDATA, errors: Error[]}>; // GraphQL response is a json object which has data and errors. even when error returns, data is still returned so browser is confused sometimes. So we need to check for errors.
    }
};