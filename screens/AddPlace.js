import PlaceForm from "../components/Places/PlaceForm";

function AddPlace({navigation}){

    function addPlaceHandler(place){
        navigation.navigate('AllPlaces',{
            place: place
        });
        console.log('AddPlace', place);
    }

    return <PlaceForm onAddPlace={addPlaceHandler} />;
}

export default AddPlace;