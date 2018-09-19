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
    ScrollView,
    AsyncStorage,
    Image, YellowBox,
    Dimensions,
    Platform
} from 'react-native';
import Login from './login'

const X_WIDTH = 375;
const X_HEIGHT = 812;
type Props = {};
YellowBox.ignoreWarnings(['M']);
let {height, width} = Dimensions.get('window');
export default class not_logged extends Component {
    state = {
        is_login : false,
        user_center_data : {},
        user_token : false,
        login_status : false,//子组件登录状态通知
        hitokoto:false,//一言
        paddingTop:20
    };
    void = () => {};

    async getUcData()  {
        UserToken = await AsyncStorage.getItem("user_token");
        if (UserToken)
        {
            //如果有token状态则取用户信息
            UserCenterData = await AsyncStorage.getItem('user_center_data'+UserToken);

            if (!UserCenterData)
            {
                UserCenterUrl = global.webServer + '/app/user_center';
                FormData = 'token='+UserToken+'&form=app&rand='+Math.random();
                fetch(UserCenterUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: FormData
                }).then((response) => response.json()).then((responseJson) =>
                {
                    console.log(responseJson)
                    this.setState({user_center_data : responseJson.data,is_login:true,user_token:UserToken});
                    AsyncStorage.setItem('user_center_data'+UserToken,JSON.stringify(responseJson.data));
                });
            }
            else
            {
                this.setState({user_center_data : JSON.parse(UserCenterData) ,is_login:true,user_token:UserToken});
            }
        }

    };
    async getHitokoto()
    {
        //未登录状态的话则获取一言
        hitokotoUrl = global.webServer + '/app/hitokoto';
        fetch(hitokotoUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            // body: FormData
        }).then((response) => response.json()).then((responseJson) =>
        {
            this.setState({hitokoto:responseJson.data});
        });
    }

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
                    this.setState({paddingTop:10, paddingBottom:0})
                }
            }
        this.getHitokoto();
    }

    render() {
        const {state , goBack ,navigate} = this.props.navigation;
        return (
            <ImageBackground
                style={{width:width,height:height,flexWrap:"wrap",paddingTop:200}}
                source={source=require('../../image/notlogin.png')}
                resizeMode='cover'
            >

                {this.state.hitokoto ?
                    <View>
                        <Text style={styles.hitokoto}>{"『 " + this.state.hitokoto.hitokoto + "』"}</Text>
                        <Text style={styles.hitokoto}>  {" -- " +  this.state.hitokoto.from + " -- "}</Text>
                    </View>

                    :
                    <Text>...</Text>
                }
                <TouchableOpacity
                    style={{width:width,alignItems:"center"}}
                    onPress={() => navigate('login',{
                        id: 123,
                        callback : () => {
                            state.params.callback();
                            goBack();
                        }
                    })
                    }
                >
                    <Text style={{width:80,color:"#fff", padding:10,borderWidth:1,borderRadius:5,borderColor:"#fff",textAlign:"center"}}>登录</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop:this.state.paddingTop,position:"absolute", bottom:50, left:(width-70)/2,
                    borderWidth:0,
                    borderRadius:5,
                    padding:10,
                    paddingTop:5,
                    paddingBottom:5,
                    backgroundColor:"#8e95c4"
                }} onPress={()=>goBack()}>
                    <Text style={{color:"#FFF",fontSize:12}}>随便看看</Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    hitokoto :{
        color:"#fff",width:width,textAlign:"center",lineHeight:22, paddingLeft:30,paddingRight:30,position:"relative",
        top:-20
    }
});
