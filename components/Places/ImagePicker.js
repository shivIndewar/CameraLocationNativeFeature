import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import {launchCameraAsync, PermissionStatus, useCameraPermissions} from 'expo-image-picker';
import { useState } from "react";
import { Colors } from "../../constants/colors";
import OutLinedButton from "../UI/OutLinedButton";

function ImagePicker({onImageTaken}){

    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
    const [pickedImage, setPickedImage] = useState();

    async function verifyPermissions(){
        if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED){
            const persmissionResponse = await requestPermission();
            return persmissionResponse.granted;
        }
        if(cameraPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert('Insufficient permissions!','your need to grant camera permissions to use this app!');
            return false;
        }
        return true;
    }

    async function ImageHandler({onTakeImage}){
      
        const hasPermissions = await verifyPermissions();

        if(!hasPermissions){
            return;
        }
      
      let image = await launchCameraAsync({
        allowsEditing: true,
        aspect:[16,9],
        quality : 0.5
      });

      setPickedImage(image.assets[0].uri);
      onImageTaken(image.assets[0].uri);
    }

    let imagePreview =<Text>No image taken yet!</Text>

    if(pickedImage){
        imagePreview = <Image style={styles.image} source={{uri:pickedImage}} />;
    }

return (
    <View>
        <View style={styles.imagePreview}>
            {imagePreview}
        </View>
        <OutLinedButton icon='camera' onPress={ImageHandler}>Take a image</OutLinedButton>
        {/* <Button title="Take Image" onPress={ImageHandler}></Button> */}
    </View>
);

}
export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview:{
        width:'100%',
        height:200,
        marginVertical:8,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor : Colors.primary100,
        borderRadius:4,
        overflow:'hidden'
    },
    image:{
        width:'100%',
        height:'100%'
    }
});