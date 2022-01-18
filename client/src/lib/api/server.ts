
interface Body<TVariables>{
    query: string;
    variables?: TVariables; // optional since ? is added.
}


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