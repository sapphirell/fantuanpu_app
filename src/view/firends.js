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
    FlatList, Dimensions

} from 'react-native';
import root from '../model/root'
let {height, width} = Dimensions.get('window');
const FriendList = (my_friends) => {
    return (
        <FlatList
        />
    );
};
export default class friends extends Component  {
    async componentDidMount() {
        let is_login = await AsyncStorage.getItem("user_token");
        let my_friends = await AsyncStorage.getItem("my_friends");
        if (is_login)
        {
            if (!my_friends)
            {
                let forumData =  "token=" +  is_login;
                let dataUrl = global.webServer + '/app/user_friends';
                my_friends = await fetch(dataUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: forumData
                }).then((response)=> {return response.json()});
            }

            this.setState({my_friends : my_friends,is_login:is_login});
        }

    }

    state = {
        is_login : false,
        my_friends : []
    };

    render() {
        const { navigate } = this.props.navigation;
        // console.log(this.state.forum_data)
        return (
            <View style={{paddingTop:10,width: width,height:height,backgroundColor:"#fff"}}>
                {
                    this.state.is_login ?
                        <FriendList
                            data={this.state.my_friends}
                        />

                    : <View/>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loginButton : {

    },

});
