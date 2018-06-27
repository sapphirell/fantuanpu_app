/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
// import '../model/root' ;
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    YellowBox,
    Button,
    ImageBackground,
    AsyncStorage,//持久化存储

} from 'react-native';
import root from '../model/root'


type Props = {};
export default class forum extends Component  {

    state = {
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>论坛</View>
        );
    }
}

const styles = StyleSheet.create({
    loginButton : {

    },

});
