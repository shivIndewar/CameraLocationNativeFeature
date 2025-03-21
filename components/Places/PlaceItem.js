import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";

function PlaceItem({place, onSelect}){
    return (
        <Pressable style={(pressed)=>[styles.item, pressed && styles.pressed]}  onPress={onSelect}>
            <Image style={styles.image} source={{ uri : place.imageUrl }}  />
            <View style={styles.info}>
                <Text style={styles.title}>{place.title}</Text>
                <Text style={styles.address}>{place.address}</Text>
            </View>
        </Pressable>
    );
}

export default PlaceItem;

const styles = StyleSheet.create({
    item:{
        flexDirection:'row',
        alignItems:'flex-start',
        borderRadius:8,
        marginVertical :10,
        backgroundColor: Colors.primary500,
        elevation:2,
        shadowColor:'black',
        shadowOpacity:0.15,
        shadowOffset:{with:1,height:1},
        shadowRadius:2
    },
    pressed:{
        opacity:0.9
    },
    image:{
        flex:1,
        borderBottomLeftRadius:4,
        borderTopLeftRadius:4,
        height:100
    },
    info:{
        flex:2,
        padding:12
    },
    title:{
        fontWeight:'bold',
        fontSize:18,
        color:Colors.primary800
    },
    address:{
        fontSize:12,
        color:Colors.primary800
    }
});