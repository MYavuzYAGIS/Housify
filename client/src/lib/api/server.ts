
interface Body<TVariables>{
    query: string;
    variables?: TVariables; // optional since ? is added.
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
        return res.json() as Promise<{data:TDATA}>;
    }
};