
import {useState, useEffect, useRef} from "react";


export const useFetch = ( url ) => {

    const isMounted = useRef(true);

    const [state, setState] = useState({data: null, loading: true, error: null} );

    useEffect( () => {

        return () => {
            isMounted.current = false
        }
    }, [])


    useEffect(() => {

        setState({data: null, loading: true, error: null})

        fetch(url)
            .then(resp => resp.json())
            .then(data => {

                if (isMounted.current) {
                    setState({
                        loading: false,
                        error: null,
                        data
                    });
                }
            })
            .catch( () => {
                setState({
                    data: null,
                    loading: false,
                    error: 'No se pudo cargar la info'
                })
            })

        // return () => {
        //     isMounted.current = false
        // }
        // Esto se puede poner ( el 'return'), en el mismo
        // useEffect o utilizar otro nuevo en el mismo componente
        // y ponerlo como return dejando vacia la primera parte

    }, [url]);

    return state;

};

