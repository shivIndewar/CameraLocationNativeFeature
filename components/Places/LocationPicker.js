import { Image, StyleSheet, Text, View } from "react-native";
import OutLinedButton from "../UI/OutLinedButton";
import { Colors } from "../../constants/colors";
import * as Location from 'expo-location';
import {getCurrentPositionAsync, useForegroundPermissions, PermissionStatus} from 'expo-location'
import { useEffect, useState } from "react";
import { getAddress, getMapPreview } from "../../util/location";
import { useIsFocused, useNavigation , useRoute } from "@react-navigation/native";

function LocationPicker({onSelectLocation}){

    const [locationPermissionInfo, requestPermission] = useForegroundPermissions();
    const [pickedLocation, setPickedLocation] = useState();
    const navigatrion = useNavigation();

    const route = useRoute();
    const isFocused = useIsFocused();
    
    useEffect(()=>{

        if(isFocused && route.params){
            const mapPickedLocation =  {
                lat: route.params.pickedLat, 
                lng:route.params.pickedLng
            };
            setPickedLocation(mapPickedLocation);
        }
    },[route, isFocused]);

    useEffect(()=>{
        async function handleLocation() {
            if(pickedLocation){
                const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
                onSelectLocation({...pickedLocation, address:address});
            }
        }
        handleLocation();
    },[pickedLocation, onSelectLocation]);

     async function verifyPermissions(){
            if(locationPermissionInfo.status === PermissionStatus.UNDETERMINED){
                const persmissionResponse = await requestPermission();
                return persmissionResponse.granted;
            }
            if(locationPermissionInfo.status === PermissionStatus.DENIED){
                Alert.alert('Insufficient permissions!','your need to grant location permissions to use this app!');
                return false;
            }
            return true;
        }


    async function getLocationHandler(){
        const hasPermission = await verifyPermissions();
        if(!hasPermission){
            return;
        }
       
       const location = await Location.getCurrentPositionAsync();
       setPickedLocation({
        lat :location.coords.latitude,
        lng : location.coords.longitude
       });
    }

    function pickLocationOnMapHandler(){
        navigatrion.navigate('Map');
    }

    let locationPreview = <Text>No location picked yet</Text>;

    if(pickedLocation){
        locationPreview =  <Image style={styles.image} source={{uri:getMapPreview(pickedLocation.lat, pickedLocation.lng)}} />;
    }

    return (
        <View>
            <View style={styles.mapPreview}>
               {locationPreview}
            </View>
            <View style={styles.actions}>
                <OutLinedButton icon='location' onPress={getLocationHandler}>Locate User</OutLinedButton>
                <OutLinedButton icon='map' onPress={pickLocationOnMapHandler}>Pick On Map</OutLinedButton>
            </View>
        </View>
    );
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview:{
        width:'100%',
        height:200,
        marginVertical:8,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor : Colors.primary100,
        borderRadius:4,
        // overflow:'hidden'
    },
    actions:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    image:{
        width:'100%',
        height:'100%',
        borderRadius: 4     
    }
});