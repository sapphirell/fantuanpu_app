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
    FlatList, Platform,
    KeyboardAvoidingView,
    TextInput,
    StatusBar
} from 'react-native';
import Login from './login'
import UserCenterButton from '../model/UserCenterButton';
import Notice from '../model/Notice';
import SmartView from "../model/SmartView";
import Icon from 'react-native-vector-icons/FontAwesome'
type Props = {};
YellowBox.ignoreWarnings(['M']);
let {height, width} = Dimensions.get('window');
let message;
// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

export default class user_center extends Component {
    child;
    state = {
        user_data : false,
        view_uid:2,
        page:1,
        message:'',
        tab:1,
        show_notice :false,
        notice_fn : false,
        letter_message : [],
        offsetForPlatform:50,
        keyboardVerticalOffset : Platform.OS === 'ios' ? 50 : -190,//键盘抬起高度
        textInputHeight : 30 ,// 输入框高度
    };

    async componentDidMount () {
        if(Platform.OS === 'ios')
        {
            if ( (height === X_HEIGHT && width === X_WIDTH) || (height === X_WIDTH && width === X_HEIGHT) )
            {
                //对iphone X 适配
                this.setState({paddingTop:44, paddingBottom:20})
            }
            else
            {
                this.setState({paddingTop:15, paddingBottom:0})
            }
        }
        this.getUserData(this.state.view_uid);
    }
    getUserData = async (view_uid) => {
        UserToken = await AsyncStorage.getItem("user_token");
        let forumData =  "token=" +  (UserToken ? UserToken : '')  + '&uid=' + this.state.view_uid;
        let dataUrl = global.webServer + 'app/user_view';
        // console.log(forumData)
        fetch(dataUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: forumData
        }).then((response) => response.json()).then((responseJson) =>
        {
            this.setState({user_data : responseJson.data});
            console.log(responseJson.data)
        });
    };
    getUserThread = async () => {
        // alert(1)
        var page = this.state.page + 1;
        let forumData =  "&page=" + page + '&uid=' + this.state.view_uid;
        let dataUrl = global.webServer + 'app/get_user_thread';

        // console.log(forumData)
        fetch(dataUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: forumData
        }).then((response) => response.json()).then((responseJson) =>
        {
            user_data = this.state.user_data;
            user_data.thread = user_data.thread.concat(responseJson.data.thread);
            this.setState({user_data: user_data,page:page});
            console.log(user_data)
        });
    };
    _onScroll = () => {
        // console.log(event.nativeEvent.contentOffset.y)
    };
    render() {
        const {state , goBack ,navigate} = this.props.navigation;


        // console.log(this.state.user_center_data.user_info);
        return (

            <View
                ref={(c)=> this.container = c}
                style={{
                width:width,
                height:height,
                // flex:1,
                backgroundColor:"#ffffff",
                // borderColor:"#ee748900",
                // borderTopWidth:this.state.paddingTop,
                paddingBottom:this.state.paddingBottom
            }}
            >

                { this.state.show_notice && <Notice message={this.state.show_notice} fn={this.state.notice_fn} />}
                <StatusBar
                    animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
                    hidden={false}  //是否隐藏状态栏。
                    backgroundColor={'green'} //状态栏的背景色
                    // translucent={true}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
                    barStyle={'light-content'} // enum('default', 'light-content', 'dark-content')
                >
                </StatusBar>
                <View
                    ref={(c)=> this._bar = c}
                    style={{
                        width:width,
                        // opacity:0,
                        position:"absolute",
                        top:0,
                        zIndex:99,
                        paddingTop:18 + this.state.paddingTop,
                        height:60,
                        flexDirection:"row",
                        flexWrap:"wrap",
                        backgroundColor:"#ee748900"
                    }}
                >
                    <TouchableOpacity
                        onPress={()=>goBack()}
                        style={{
                            // textAlign: "left",
                            flexDirection:"row",
                            width:70,
                            marginRight:width-180,
                            // marginTop:10
                        }}>
                        <Image source={source=require('../../image/arrow-left.png')} style={{width: 16, height: 16,borderRadius:5, marginLeft:10}} />
                    </TouchableOpacity>
                    {
                        this.state.upload_status === 'uploading...' &&
                        <View style={{flexDirection:"row",width:70}}>
                            <Text style={{color:"#fff",fontSize:13,}}>上传中...</Text>
                            <Image
                                source={source=require('../../image/loading.gif')}
                                style={{width: 15, height: 15,borderRadius:5, marginLeft:10}} />
                            />
                        </View>
                    }
                </View>
                <ScrollView
                    style={{
                        // height:500,
                        width:width,
                    }}
                    scrollEventThrottle={20} // 触发频率
                    onScroll={(event) => {
                        var y   = event.nativeEvent.contentOffset.y > 75 ? 75 :
                                 (event.nativeEvent.contentOffset.y <= 0 ? 1 : event.nativeEvent.contentOffset.y)
                        ;
                        var opacityColor = (Math.floor( (y/75 * 255 )) < 10 ? "0" : '') //前缀0
                                + Math.floor((y/75 * 255 )) .toString(16);
                        var opacity = y /75;
                        this._bar.setNativeProps({
                            style: {
                                // color: '#000000' + opacityColor
                                // opacity : opacity
                                backgroundColor:'#ee7489' + opacityColor
                            }
                        });
                        this.container.setNativeProps({
                            style: {
                                borderColor: '#ee7489' + opacityColor
                            }
                        });
                        // console.log(Math.floor((y / 75 * 255 )))
                        // console.log(opacity)
                    }}>
                    <ImageBackground
                        style={{
                            width:width,
                            height:120,
                            paddingTop:this.state.paddingTop,
                            marginBottom:50
                            // position:"absolute",
                            // top:0
                        }}
                        source={require('../../image/C3B36AF37E86E726820C83C088D1777F.jpg')} resizeMode='cover'>

                        {
                            this.state.user_data &&
                                <View>
                                    <View style={{marginTop:70,marginLeft:30,flexDirection:"row"}}>
                                        <Image source={{uri: this.state.user_data.user.avatar}} style={{width: 80, height: 80,borderRadius:40,marginRight:15}} />
                                        <Text style={{marginTop:50,fontSize:16,color:"#5e5e5e",fontWeight:"700"}}>{this.state.user_data.user.username}</Text>
                                        <View  style={{margin:10,marginTop:40,flexDirection:"row"}}>
                                            {
                                                this.state.user_data.relation ?
                                                    <TouchableOpacity>
                                                        <Text  style={{color:"#fff", paddingTop:5,paddingBottom:5,paddingLeft:10,paddingRight:10,borderWidth:1,fontSize:15,
                                                            borderColor:"#ee7489",backgroundColor:"#ee7489",borderRadius:3,overflow:"hidden"}}>私信</Text>
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity style={{marginLeft:10}}>
                                                        <Text style={{color:"#fff", paddingTop:5,paddingBottom:5,paddingLeft:10,paddingRight:10,borderWidth:1,fontSize:15,
                                                            borderColor:"#ee7489",backgroundColor:"#ee7489",borderRadius:3,overflow:"hidden"}}>加好友</Text>
                                                    </TouchableOpacity>
                                            }


                                        </View>

                                    </View>


                                </View>

                        }
                    </ImageBackground>
                    <View style={{flexDirection:"row", padding:10}}>
                        <TouchableOpacity
                            onPress={()=>{this.setState({'tab':1})}}
                            style={{borderBottomWidth:this.state.tab === 1 ? 1 :0,borderColor:"#ee7b6f", paddingTop:10,paddingBottom:10,paddingLeft:20,paddingRight:20}}>
                            <Text>最近</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{this.setState({'tab':2})}}
                            style={{borderBottomWidth:this.state.tab === 2 ? 1 :0,borderColor:"#ee7b6f", paddingTop:10,paddingBottom:10,paddingLeft:20,paddingRight:20}}>
                            <Text>统计</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.user_data && this.state.tab === 1 &&
                        <FlatList
                            data={this.state.user_data.thread}
                            style={{zIndex:1, paddingTop:5,marginTop:5 ,height:height-300}}
                            keyExtractor = {  (item) => item.tid + item.subject }

                            onEndReached={()=>{
                                this.getUserThread()
                            }}
                            onEndReachedThreshold={0.01}
                            renderItem= {
                                ({item}) => {
                                    return (
                                        <TouchableOpacity style={{marginBottom:15,padding:10}} >
                                            <Text style={{color:"#4f4f4f",fontSize:15}} numberOfLines={1}>{item.subject}</Text>
                                            <Text style={{color:"#ccc",paddingTop:10}}>{item.dateline}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                            }
                        />
                    }
                    {
                        this.state.user_data && this.state.tab === 2 &&
                            <View>
                                <View style={styles.score_row}>
                                    <View style={styles.score_block}>
                                        <Text style={styles.score_title}>积分1</Text>
                                        <Text style={styles.score_value}>100</Text>
                                    </View>
                                    <View style={styles.score_block}>
                                        <Text style={styles.score_title}>积分1</Text>
                                        <Text style={styles.score_value}>100</Text>
                                    </View>
                                    <View style={styles.score_block}>
                                        <Text style={styles.score_title}>积分1</Text>
                                        <Text style={styles.score_value}>100</Text>
                                    </View>
                                    <View style={styles.score_block}>
                                        <Text style={styles.score_title}>积分1</Text>
                                        <Text style={styles.score_value}>100</Text>
                                    </View>
                                </View>
                                <View style={styles.score_row}>
                                    <View style={styles.score_block}>
                                        <Text style={styles.score_title}>积分1</Text>
                                        <Text style={styles.score_value}>100</Text>
                                    </View>
                                    <View style={styles.score_block}>
                                        <Text style={styles.score_title}>积分1</Text>
                                        <Text style={styles.score_value}>100</Text>
                                    </View>
                                    <View style={styles.score_block}>
                                        <Text style={styles.score_title}>积分1</Text>
                                        <Text style={styles.score_value}>100</Text>
                                    </View>
                                    <View style={styles.score_block}>
                                        <Text style={styles.score_title}>积分1</Text>
                                        <Text style={styles.score_value}>100</Text>
                                    </View>
                                </View>
                            </View>
                    }
                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    score_row : {
        flexDirection:"row",
        alignItems:"flex-start",justifyContent:"space-around",
        margin:5
    },
    score_block : {
        flex:1,alignItems:"center"
        ,justifyContent:"space-around", margin:10
    },
    score_title:{
        color:"#ccc",
        fontSize:12,

    },
    score_value:{
        color :"#42b0cc",
        fontSize:19
    },
});
