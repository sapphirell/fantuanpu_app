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
    ImageBackground
} from 'react-native';
import root from '../model/root'
YellowBox.ignoreWarnings(['Warning:']);
YellowBox.ignoreWarnings(['T']);
YellowBox.ignoreWarnings(['M']);

// YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated in plain JavaScript React classes. Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks.']);
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class login extends Component  {
    static navigationOptions = {
        // title : '登录',
        // header : {
        //     visible:false
        // }
    };
    getHttpData = () => {
        alert(1);
        const url = "http://localhost:8000/app/test";
        fetch(url,{
            method:'GET'
        }).then((response)=>response.json()).then((jsonStr) => {});
    };
    userLogin = (navigate) => {
        // navigate('user_center',{
        //     id:123
        // })
        loginUrl = global.webServer + 'do-login';
        console.log(loginUrl);
            fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'email=1745247379@qq.com&password=asdasdasd&form=app'
            })  .then((response) => response.json())
                .then((responseJson) => {
                    // console.log(responseJson)
                    if (responseJson.ret == 200)
                    {
                        navigate('user_center',{
                            response:responseJson
                        })
                    }
                    else
                    {
                        alert(responseJson.msg)
                    }

                })
                .catch((error) => {
                    console.error(error);
                });

    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ImageBackground
                style={styles.container}
                source={require('../../image/login.png')} resizeMode='cover'>

                <ImageBackground
                    style={styles.loginBox}
                    source={require('../../image/login_form.png')}
                >
                    <TextInput
                        style={styles.TextInputTop}
                        onChangeText={(text) => this.setState({text})}
                    />
                    <TextInput
                        password={true}
                        style={styles.TextInputBottom}
                        onChangeText={ (text) => this.setState({text}) }

                    />
                </ImageBackground>

                <TouchableOpacity onPress={this.getHttpData}>
                    <Text>注册</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={ () => { this.userLogin(navigate) } }
                >
                    <Text>登录</Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    loginButton : {

    },
    loginBox : {
        width:200,
        height:100
        // shadowOffset: {width: 0, height: 3},
        // shadowColor: '#6d6d6d',
        // shadowOpacity: 1,
        // shadowRadius: 5
    },
    TextInputTop :{
        height: 47,
        width: 140,
        padding:9,
        marginLeft:50,
        // borderWidth: 1,
        // borderTopLeftRadius:3,
        // borderTopRightRadius:3,
        // backgroundColor:"#fff",
        // borderColor:"#fff",
        // borderBottomColor: "#ff7586"
        // shadowOffset: {width: 0, height: 0},shadowColor: '#5db2ff',shadowOpacity: 1, shadowRadius: 5
    },
    TextInputBottom :{
        height: 47, width: 140,padding:9,
        marginLeft:50,
        // borderColor: '#fff',
        // borderWidth: 1,
        // borderTopWidth :0,borderBottomLeftRadius:3,borderBottomRightRadius:3,
        // backgroundColor:"#fff",
        // shadowOffset: {width: 0, height: 0},shadowColor: '#5db2ff',shadowOpacity: 1, shadowRadius: 5
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff7586',
        // backgroundImage:'http://localhost:8000/app/top.png',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
