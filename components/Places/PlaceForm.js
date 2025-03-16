import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from "../../modle/Place";

function PlaceForm({onAddPlace}){

    const [enterTitle, setTitle] = useState('');
    const [selectedLocation, setselectedLocation] = useState();
    const [selectedImage, setSelectedImage] = useState();


    function onchageTitleHandler(enteredText){
        setTitle(enteredText);
    }
    
    function savePlaceHandler(){
        console.log("before object creation",enterTitle,selectedImage,selectedLocation);
       const placeData = new Place(enterTitle, selectedImage,selectedLocation);

       console.log("Place for placeData", placeData);
        onAddPlace(placeData);
    }
    
    function onImageTakenHandler(imageUrl){
        setSelectedImage(imageUrl);
    }

    const onSelectLocationHandler = useCallback ((location) => {
        setselectedLocation(location);
    },[]);

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText={onchageTitleHandler} value={enterTitle} />
            </View>
            <ImagePicker onImageTaken={onImageTakenHandler} />
            <LocationPicker onSelectLocation={onSelectLocationHandler} />
            <Button onPress={savePlaceHandler}>Add Place</Button>
        </ScrollView>
        
    );
}

export default PlaceForm;

const styles = StyleSheet.create({
    form:{
        flex:1,
        padding : 24
    },
    label:{
        fontWeight:'bold',
        marginBottom:4,
        color: Colors.primary500
    },
    input:{
        marginVertical :8,
        paddingHorizontal : 4,
        paddingVertical : 8,
        fontSize:16,
        borderBlockColor : Colors.primary700,
        borderBottomWidth : 8,
        backgroundColor: Colors.primary100
    }
});