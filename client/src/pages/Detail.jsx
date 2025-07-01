import { useEffect, useState } from "react";
import Details from "../components/Detail"
import { useParams } from "react-router-dom";

function Detail() {
    const { id } = useParams();
    const [Id, setId] = useState("");

    useEffect(()=>{
        setId(id);
    },[])
    return (
        <Details key={id} id={Id}/>
    )
}

export default Detail