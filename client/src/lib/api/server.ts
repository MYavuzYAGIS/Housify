interface Body{
    query: string;
}


// making a cross-origin request to the server on localhost.
export const server ={
    fetch: async <TDATA =any >(body:Body) => {
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