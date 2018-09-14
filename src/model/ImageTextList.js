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

            }}>
                <Image
                    source={{
                        uri: "http://image.fantuanpu.com///upload//20180914//44a3ec217eaa6be9f56cf70c0c2fc6a7.png"
                    }}
                    style={{width:250, height:250,borderRadius:12.5}}
                />
            </View>
        );
    }
}
