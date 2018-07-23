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
    Dimensions
} from 'react-native';
import Login from './login'
import UserCenterButton from '../model/UserCenterButton';
type Props = {};
YellowBox.ignoreWarnings(['M']);
let {height, width} = Dimensions.get('window');
export default class user_center extends Component {
    state = {
        is_login : false,
        user_center_data : {},
        user_token : false,
        login_status : false,//子组件登录状态通知
    };
    async getUserCenterData ()  {
        UserToken = await AsyncStorage.getItem("user_token");

        //如果token不存在则登录状态为false
        // UserToken ? this.setState({is_login : true}) : '';
        if (UserToken)
        {
            //如果有token状态则取用户信息
            UserCenterData = await AsyncStorage.getItem('user_center_data'+UserToken);

            if (!UserCenterData)
            {
                UserCenterUrl = global.webServer + '/app/user_center';
                FormData = 'token='+UserToken+'&form=app&rand='+Math.random();
                // alert(FormData);
                fetch(UserCenterUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: FormData
                }).then((response) => response.json()).then((responseJson) =>
                {
                    this.setState({user_center_data : responseJson.data,is_login:true,user_token:UserToken});
                    // alert(JSON.stringify(responseJson.data));
                    AsyncStorage.setItem('user_center_data'+UserToken,JSON.stringify(responseJson.data));
                    // console.log(this.state.user_center_data.user_avatar)
                });
            }
            else
            {
                this.setState({user_center_data : JSON.parse(UserCenterData) ,is_login:true,user_token:UserToken});
            }
        }

    };


    async componentDidMount() {
        const {state , goBack ,navigate} = this.props.navigation;
        UserToken = await AsyncStorage.getItem("user_token");
        UserCenterData = await AsyncStorage.getItem('user_center_data'+UserToken);

        if (UserToken)
        {
            this.getUserCenterData();
        }
        else
        {
            navigate('not_logged',{
                id:233,
                callback : () => { this.getUserCenterData(); }
            });
        }

    }
    logout =() => {
        // UserCenterData = await AsyncStorage.getItem('user_center_data'+UserToken);
        // alert(this.state.user_token);
        // AsyncStorage.removeItem("user_token");
        // AsyncStorage.removeItem("user_center_data" + this.state.user_token);

        global.logout(this.state.user_token);
        this.setState({
            is_login : false,
            user_center_data : {},
            user_token : false,
        });
    };

    render() {
        const {state , goBack ,navigate} = this.props.navigation;
       
        // console.log(state.params);
        // console.log(this.state.user_center_data.user_info);
        return (

            <View style={styles.container}>
                    <ImageBackground
                        // style={styles.headerView}
                        style={{width:width,height:190,alignItems:"center",paddingTop:35}}
                        source={source=require('../../image/ucbg.jpg')} >
                        {this.state.user_center_data && <Image source={{uri: this.state.user_center_data.user_avatar}} style={{width: 80, height: 80,borderRadius:40,}} />}
                        <Text style={{margin:10,
                            fontSize:18,
                            color:"#fff",
                            textShadowOffset:{height:1},
                            textShadowRadius:2,
                            textShadowColor:'grey',
                            fontWeight:'700',
                            }}>
                            {this.state.user_center_data.user_info && this.state.user_center_data.user_info.username}
                        </Text>
                        <Text style={{
                            fontSize:19,
                            color:"#fff",
                            textShadowOffset:{width:5},
                            textShadowRadius:2,
                            textShadowColor:'grey'
                        }}>签名档</Text>
                    </ImageBackground>
                    {this.state.is_login ?
                    <ScrollView style={{backgroundColor:"#eeeeee",height:400}}>

                        <UserCenterButton name={this.state.user_center_data.user_count.extcredits.extcredits1}
                                          value={this.state.user_center_data.user_count.extcredits1} onPress={()=>{return this.void}}/>

                        <UserCenterButton name={this.state.user_center_data.user_count.extcredits.extcredits2}
                                          value={this.state.user_center_data.user_count.extcredits2} onPress={()=>{return this.void}}/>

                        <UserCenterButton name={this.state.user_center_data.user_count.extcredits.extcredits3}
                                          value={this.state.user_center_data.user_count.extcredits3} onPress={()=>{return this.void}}/>

                        <UserCenterButton name={this.state.user_center_data.user_count.extcredits.extcredits4}
                                          value={this.state.user_center_data.user_count.extcredits4} onPress={()=>{return this.void}}/>

                        <UserCenterButton name={this.state.user_center_data.user_count.extcredits.extcredits5}
                                          value={this.state.user_center_data.user_count.extcredits5} onPress={()=>{return this.void}}/>

                        <UserCenterButton name={this.state.user_center_data.user_count.extcredits.extcredits6}
                                          value={this.state.user_center_data.user_count.extcredits6} onPress={()=>{return this.void}}/>

                        <UserCenterButton name={this.state.user_center_data.user_count.extcredits.extcredits7}
                                          value={this.state.user_center_data.user_count.extcredits7} onPress={()=>{return this.void}}/>

                        <UserCenterButton name={this.state.user_center_data.user_count.extcredits.extcredits8}
                                          value={this.state.user_center_data.user_count.extcredits8} onPress={()=>{return this.void}}/>

                        <UserCenterButton name="退出登录" onPress={ ()=>{ this.logout() }}  />


                    </ScrollView>
                        :
                        <UserCenterButton name="登录账号" onPress={
                                () => navigate('login',{
                                    id: 123,
                                    callback : () => { this.getUserCenterData(); }
                                })
                            }
                        />
                    }


                    <TouchableOpacity/>



                }
                {/*<ImageBackground*/}
                    {/*style={styles.container}*/}
                    {/*source={require('../../data/image/user_center_background.png')} resizeMode='cover'*/}
                {/*>*/}

                {/*</ImageBackground>*/}
                {/*<Text>id:{state.params.id}</Text>*/}
                {/*<Text onPress={()=>goBack()}>返回</Text>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    headerView :{
        flex: 1,
        height:50,
        paddingTop:30,
        width:width,
        alignItems: 'center',
        backgroundColor: '#888',
    },
    hitokoto :{
        color:"#fff",width:width,textAlign:"center",lineHeight:22, paddingLeft:20,paddingRight:20,position:"relative",
        top:-20
    }
});
