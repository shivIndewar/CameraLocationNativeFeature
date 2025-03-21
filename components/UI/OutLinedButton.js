import { Pressable, StyleSheet, Text } from "react-native";
import {Ionicons} from '@expo/vector-icons';
import { Colors } from "../../constants/colors";
function OutLinedButton({onPress, icon, children}){
    return (
        <Pressable style={({pressed})=>[styles.button, pressed && styles.pressed]} onPress={onPress}>
            <Ionicons style={styles.icon} name={icon} size={18} color={Colors.primary500} />
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
}
export default OutLinedButton;

const styles = StyleSheet.create({
    button:{
        paddingHorizontal:10,
        paddingVertical:6,
        margin:4,
         flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:Colors.primary500,
    },
    pressed:{
        opacity:0.75
    },
    icon:{
        marginRight:6
    },
    text:{
        color:Colors.primary500
    }

});