import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    navigate,
    ImageBackground,
    AsyncStorage,
    Image,
    Dimensions
} from 'react-native';

let {height, width} = Dimensions.get('window');
export default class UserCenterButton extends Component {

    render () {
        return (
            <View style={styles.view}>
                <TouchableOpacity onPress={this.props.onPress} style={styles.option}>


                    <Text style={{textAlign:"left",paddingLeft:15, flex:1,flexDirection:"row"}}>
                        <Text style={{}}>{this.props.name}</Text>


                    </Text>
                    {
                        this.props.value &&
                        <View style={{backgroundColor:"#dd6567",color:"#FFF",borderRadius:5,width:20,height:17,marginRight:10}}>
                            <Text style={{color:"#fff",width:20,textAlign:"center",}}>{this.props.value}</Text>
                        </View>
                    }
                    <Image source={source=require('../../image/ucgoto.png')} style={{width:13,height:13}} />
                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    view : {
        backgroundColor:"#fff",
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:"#eaeaea",
        // marginTop:5,
        width:width

        // height:50
    },
    option : {
        flexDirection:'row',
        // textAlign: "center",
        padding:12,

    },
    text :{

    }
});
