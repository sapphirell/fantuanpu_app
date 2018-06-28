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
    FlatList

} from 'react-native';
import root from '../model/root'

export default class friends extends Component  {
    async componentDidMount() {

    }

    state = {
        forum_data : {}
    };

    render() {
        const { navigate } = this.props.navigation;
        // console.log(this.state.forum_data)
        return (
            <View style={{paddingTop:10}}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    loginButton : {

    },

});
