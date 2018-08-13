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
export default class Notice extends Component  {

    async componentDidMount() {

    }
    state = {

    };
    render() {
        // console.log(this.props.children);
        return (
            <View style={{
                position:"absolute", zIndex:10,width:width,height:height,
                // backgroundColor:"#0202025c"
            }}>
                <View style={{
                    height:120,
                    width:width-100,
                    marginLeft:50,
                    marginTop:200,
                    shadowOffset: {width: 0, height: 5},
                    shadowOpacity: 0.8,
                    shadowRadius: 5,
                    borderColor:"#ee7489",
                    borderWidth:3,
                    shadowColor: "#0202025c",
                    backgroundColor:"#ffffffdb",
                    borderRadius:10,
                    elevation: 4
                    //注意：这一句是可以让安卓拥有灰色阴影

                }}>

                    <Text style={{width:width-100, paddingLeft:5,paddingRight:5,height:75,color:"#ee7489",paddingTop:20,textAlign:"center",fontSize:16}}>{this.props.message ? this.props.message : "提醒" }</Text>
                    <TouchableOpacity style={{width:width-100,alignItems:"center",flexDirection:"row"}} onPress={this.props.fn}>
                        <Text style={{color:"#ee7489",fontSize:17,marginLeft:100}}>了解了</Text>
                        <Image  source={source=require('../../image/makesure.png')} style={{width:30,height:30}} />
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}
