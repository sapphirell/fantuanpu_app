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
                    <Text style={{textAlign:"center", flex: 1,}}>{this.props.name}
                        <Text>  {this.props.value}</Text>
                    </Text>
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
        marginTop:5,
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
