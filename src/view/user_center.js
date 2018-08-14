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
import Notice from '../model/Notice';
type Props = {};
YellowBox.ignoreWarnings(['M']);
let {height, width} = Dimensions.get('window');
export default class user_center extends Component {
    state = {
        is_login : false,
        user_center_data : {},
        user_token : false,
        login_status : false,//子组件登录状态通知
        show_notice :false,
        notice_fn : false,

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
    checkVersion = () => {
        fetch('https://image.fantuanpu.com/upload_file', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data;charset=utf-8',
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseData)=> {
                console.log('uploadImage', responseData);
                resolve(responseData);
            })
            .catch((err)=> {
                console.log('err', err);
                reject(err);
            });
    };
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
                { this.state.show_notice && <Notice message={this.state.show_notice} fn={this.state.notice_fn} />}
                <ImageBackground
                    // style={styles.headerView}
                    style={{width:width,height:190,alignItems:"center",paddingTop:35}}
                    source={source=require('../../image/13889176.png')} >
                    <TouchableOpacity style={{position:"absolute",right:30,top:30}}>
                        <Image source={source = require('../../image/edit.png')} style={{width:18,height:18}} />
                    </TouchableOpacity>

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
                <View style={{flexDirection:"row",backgroundColor:"#fff",width:width-20,marginLeft:10,marginRight:10,
                    borderRadius:5,marginTop:10,marginBottom:5,
                    alignItems:"flex-start",justifyContent:"space-around",paddingTop:15,paddingBottom:10}}>
                    <TouchableOpacity style={{alignItems:"center"}} onPress={
                        () => {
                            navigate('user_score',{
                                score: this.state.user_center_data,
                                // callback : () => { this.getUserCenterData(); }
                            })}
                        } >
                        <Image source={source=require('../../image/score.png')} style={styles.listButton}/>
                        <Text style={styles.listButtonText}>积分</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems:"center"}}>
                        <Image source={source=require('../../image/my_thread.png')} style={styles.listButton}/>
                        <Text style={styles.listButtonText}>帖子</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems:"center"}}>
                        <Image source={source=require('../../image/like.png')} style={styles.listButton}/>
                        <Text style={styles.listButtonText}>喜欢</Text>
                    </TouchableOpacity>
                </View>
                {this.state.is_login ?
                <ScrollView style={{backgroundColor:"#eeeeee",height:400}}>
                    <UserCenterButton name="意见反馈" image="report" value={this.state.user_center_data.user_count.extcredits1} onPress={() => {
                        navigate('report',{
                            tid: 3601,
                            // callback : () => { this.getUserCenterData(); }
                        })
                    }}/>
                    <UserCenterButton
                            name="版本检查"
                            image="report"
                        onPress={async ()=>{
                            fetch(global.webServer + 'app/version', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'multipart/form-data;charset=utf-8',
                                },
                            }).then((response) => response.json())
                                .then((responseData)=> {
                                    if (responseData.data === global.version)
                                    {
                                        this.setState({
                                            show_notice : "您的版本为最新(" + responseData.data +")",
                                            notice_fn : () => {
                                                this.setState({show_notice:false,notice_fn:false})
                                            }
                                        });
                                    }
                                    else
                                    {
                                        this.setState({
                                            show_notice :  "当前您安装的版本为 " + global.version + "。 最新版本为" + responseData.data,
                                            notice_fn : () => {
                                                this.setState({show_notice:false,notice_fn:false})
                                            }
                                        });

                                    }

                                })
                                .catch((err)=> {
                                    console.log('err', err);
                                    reject(err);
                                });

                            return this.void
                        }}

                    />

                    <UserCenterButton name="退出登录" onPress={ ()=>{ this.logout() }} image="logout" />
                </ScrollView>
                    :
                <ScrollView style={{backgroundColor:"#eeeeee",height:400}}>
                    <UserCenterButton name="登录账号" onPress={
                        () => navigate('login',{
                            id: 123,
                            callback : () => { this.getUserCenterData(); }
                        })
                    }
                    />
                </ScrollView>

                }



            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#eee',
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
    },
    listButton : {width:30,height:30,marginBottom:15},
    listButtonText : {fontSize:12,color:"#5d5d5d",textAlign:"center",width:50}
});
