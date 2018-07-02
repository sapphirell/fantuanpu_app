/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
// import '../model/root' ;
import React, { Component } from 'react';
import {
    StyleSheet,
    AsyncStorage,//持久化存储
    Image,

} from 'react-native';
import root from '../model/root'

export default class forum extends Component  {
    async componentDidMount() {
    }
    render() {
        return (
            <Image></Image>
        );
    }
}

const styles = StyleSheet.create({
    loginButton : {

    },

});
