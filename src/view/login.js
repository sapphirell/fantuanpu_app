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
export default class login extends Component  {
    static navigationOptions = {
        // title : '登录',
        // header : {
        //     visible:false
        // }
    };
    state = {
        email:'',
        password:'',
    };
    userLogin = (navigate) => {
        // navigate('user_center',{
        //     id:123
        // })
        //检查是否填写
        // if(!this.state.email || !this.state.password)
        // {
        //     alert('尚未填写账号或密码');
        //     return false;
        // }
        loginUrl = global.webServer + 'do-login';
        formData = 'email='+this.state.email+'&password='+this.state.password+'&form=app';
        // formData = 'email=1745247379@qq.com&password=asdasdasd&form=app';
        // console.log(loginUrl);
        // console.log(formData);
            fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData
            })  .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.ret == 200)
                    {
                        AsyncStorage.setItem('user_token', responseJson.data.token).then(
                            () => {
                                navigate('user_center',{
                                    response:responseJson,
                                    display:1
                                })
                            }
                        );
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
                        onChangeText={(text) => this.setState({email:text})}
                    />
                    <TextInput
                        password={true}
                        style={styles.TextInputBottom}
                        onChangeText={ (text) => this.setState({password:text}) }

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
