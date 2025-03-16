import { Pressable, StyleSheet, Text, View } from "react-native";
import {Ionicons} from '@expo/vector-icons';
function IconButton({icon,size,color,onPress}){
    return (
        <Pressable style={styles.button}>
            <Ionicons name={icon} size={size} color={color} onPress={onPress} />
        </Pressable>
    );
}
    
export default IconButton;

const styles = StyleSheet.create({
    button:{
        padding:8,
        margin:8,
        justifyContent:'center',
        alignItems:'center'
    },
    pressed:{
        opacity:0.7
    }
});