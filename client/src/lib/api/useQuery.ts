import { useEffect, useReducer, useCallback } from "react";
import { server } from "./server";






interface State<TData> {
  data: TData | null;
  loading: boolean; // in order to track the loading state
  error: boolean | null; // in order to track the error state
}

type Action<TData> = | { type: "FETCH_INIT" } | { type: "FETCH_SUCCESS", payload: TData } | { type: "FETCH_FAILURE" }

interface QueryResult<TData> extends State<TData> {
  refetch: () => void;

}


const reducer = <TData>()=>(state:State<TData>, action: Action<TData>):State<TData>=>{
  switch (action.type) {
    case "FETCH_INIT":
      return {...state, loading:true }
    case "FETCH_SUCCESS":
      return {data:action.payload, loading:false, error:false}
    case "FETCH_FAILURE":
      return { ...state, loading:false, error:true}
    default:
      throw new Error();

  }
}


export const useQuery = <TData = any>(query: string) : QueryResult<TData> => {

  const fetchReducer = reducer<TData>();
  const [state, dispatch] = useReducer(fetchReducer, { data: null , loading: false, error:false} as State<TData>);




  const fetch = useCallback(() => {
    const fetchApi = async () => {
        try{
          dispatch({type:"FETCH_INIT"});
      const { data, errors } = await server.fetch<TData>({ query });
    
      if (errors && errors.length){
          throw new Error(errors[0].message);
      }
        dispatch({type:'FETCH_SUCCESS', payload:data})


        }catch(err){
            dispatch({type:'FETCH_FAILURE'})
            throw console.error(err);
        }
        
    };
    fetchApi();
  }, [query]);

  useEffect(() => {
    fetch();
  }, [fetch]);
  return {...state,refetch:fetch};
};
