import React, { Component } from 'react';
import {
    StyleSheet,
    AsyncStorage,//持久化存储
    Image,
    TouchableOpacity,
    View,
    Text,
    Dimensions,
    Platform

} from 'react-native';
import root from '../model/root'
import ImagePicker from "react-native-image-picker";
let {height, width} = Dimensions.get('window');

// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;



export default class SmartView extends Component  {

    async componentDidMount() {
        if(Platform.OS === 'ios')
        {
            if ( (height === X_HEIGHT && width === X_WIDTH) || (height === X_WIDTH && width === X_HEIGHT) )
            {
                //对iphone X 适配
                this.setState({paddingTop:44, paddingBottom:20})
            }
            else
            {
                this.setState({paddingTop:20, paddingBottom:0})
            }
        }
    }
    state = {
        paddingTop : 0,
        paddingBottom: 0
    };
    render() {
        // console.log(this.props.children);
        return (
            <View style={{
                width:width,
                height:height,
                backgroundColor:"#ffffff",
                borderColor:"#ee7489",
                borderTopWidth:this.state.paddingTop,
                paddingBottom:this.state.paddingBottom}} >
                {this.props.children}
            </View>
        );
    }
}
