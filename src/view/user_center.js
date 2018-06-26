/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    navigate,
    ImageBackground,
    AsyncStorage,
    Image
} from 'react-native';


type Props = {};
export default class user_center extends Component {
    state = {
        is_login : false,
        user_center_data : {}
    };
    async componentDidMount() {
        UserToken = await AsyncStorage.getItem("user_token");

        //如果token不存在则登录状态为false
        // UserToken ? this.setState({is_login : true}) : '';

        UserCenterUrl = global.webServer + '/app/user_center';
        FormData = 'token='+UserToken+'&form=app';
        fetch(UserCenterUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: FormData
        }).then((response) => response.json()).then((responseJson) =>
        {
            this.setState({user_center_data : responseJson.data,is_login:true});
            console.log(this.state.user_center_data.user_avatar)
        });


    }
    getHttpData = () => {
        alert(1);
        const url = "http://localhost:8000/app/test";
        fetch(url,{
            method:'GET'
        }).then((response)=>response.json()).then((jsonStr) => {});
    };

    render() {
        const {state , goBack ,navigate} = this.props.navigation;
        console.log(state.params);
        return (
            <View style={styles.container}>
                {this.state.is_login ?
                    <View>
                        <Text>
                            {/*{state.params && state.params.response.data.username}*/}
                            {/*{this.state.user_center_data && this.state.user_center_data.data.user_info.username}*/}
                        </Text>
                        <Image source={{uri: this.state.user_center_data.user_avatar}} style={{width: 100, height: 100}} />
                    </View>
                    :
                    <View>
                        <TouchableOpacity
                            onPress={() => navigate('login', {
                                id: 123
                            })}
                        >
                            <Text>登录</Text>
                        </TouchableOpacity>
                    </View>
                }
                {/*<ImageBackground*/}
                    {/*style={styles.container}*/}
                    {/*source={require('../../data/image/user_center_background.png')} resizeMode='cover'*/}
                {/*>*/}

                {/*</ImageBackground>*/}
                {/*<Text>id:{state.params.id}</Text>*/}
                <Text onPress={()=>goBack()}>返回</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
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
