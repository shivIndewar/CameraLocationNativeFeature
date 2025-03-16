import { useEffect, useState } from "react";
import PlacessList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";

function AllPlaces({route}){
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    const isFocused = useIsFocused();

    useEffect(()=>{
        if(isFocused && route.params){
            setLoadedPlaces(curentPlace => [...curentPlace, route.params.place]);
        }
    },[isFocused, route]);

    return (
        <PlacessList places ={loadedPlaces} />
    );
}

export default AllPlaces;