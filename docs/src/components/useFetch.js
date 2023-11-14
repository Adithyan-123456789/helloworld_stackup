import { useState, useEffect } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [pending, isPending] = useState(true);
    const [error, isError] = useState(null);

    useEffect(() => {

        fetch(url) //don't change this url.Evede onum chayanda.
            .then(res => {
                if (!res.ok) {
                    isError(true);
                    throw Error("Unexpected Error");
                }
                console.log("Responded");
                return res.json();
            })
            .then(data => {

                setData(data);
                isPending(false);
                isError(null);
                console.log("Data fielded");
            })
            .catch((e) => {
                console.log("Error detected");
                isPending(false);
                isError(e.message);
            });


    }, [url]);

    return { data, pending, error };

}

export default useFetch;