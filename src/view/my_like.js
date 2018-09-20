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

YellowBox.ignoreWarnings(['M']);
let {height, width} = Dimensions.get('window');
// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

export default class my_like extends Component {
    child;
    state = {
        api_json : false,
        user_data : false,
        date_map:false,
        page:0,
        message:'',
        tab:1,
        show_notice :false,
        notice_fn : false,
        letter_message : [],

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
        // await this.setState({uid:this.props.navigation.state.params.uid});
        this.getUserThread();
    }

    getUserThread = async () => {

        var page = this.state.page + 1;
        let UserToken = await AsyncStorage.getItem("user_token");
        let forumData =  "&page=" + page + '&token=' + UserToken;
        let dataUrl = global.webServer + 'app/show_my_like';
        // console.log(forumData)
        fetch(dataUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: forumData
        }).then((response) => response.json()).then((responseJson) =>
        {

            if (this.state.user_data)
            {}
            else
            {
                console.log(responseJson.data)
                this.setState({
                    user_data:responseJson.data,
                    page:page
                });
            }


        });
    };
    _onScroll = () => {
        // console.log(event.nativeEvent.contentOffset.y)
    };
    render() {
        const {state , goBack ,navigate ,push} = this.props.navigation;


        // console.log(this.state.user_center_data.user_info);
        return (

            <View
                ref={(c)=> this.container = c}
                style={{
                    width:width,
                    height:height,
                    backgroundColor:"#ffffff",
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
                    style={{width:width,position:"absolute",top:0,zIndex:99,paddingTop:18 + this.state.paddingTop,height:Platform.OS === 'ios'? 60 : 50,flexDirection:"row",flexWrap:"wrap", backgroundColor:"#ee748900"
                    }}
                >
                    <TouchableOpacity
                        onPress={()=>goBack()}
                        style={{
                            // textAlign: "left",
                            flexDirection:"row",
                            width:70,
                            marginRight:width-180,
                            marginTop:Platform.OS === 'ios' ? 0 : 15
                        }}>
                        <Image source={source=require('../../image/left-w.png')} style={{width: 16, height: 16,borderRadius:5, marginLeft:10}} />
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

                <ImageBackground
                    style={{
                        width:width,
                        height:120,
                        paddingTop:this.state.paddingTop,
                        marginBottom:50
                    }}
                    source={require('../../image/61264728_p0.jpg')}
                    resizeMode='cover'
                >
                </ImageBackground>
                {
                    this.state.user_data &&
                    <FlatList
                        data={this.state.user_data}
                        style={{zIndex:1,marginTop:5 ,height:height-55,position:"absolute",width:width,padding:20, paddingTop:this.state.paddingTop+55,}}
                        keyExtractor = {  (item) => item.subject + item.author }
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
                                    backgroundColor:'#ee7489' + opacityColor
                                }
                            });
                            this.container.setNativeProps({
                                style: {
                                    borderColor: '#ee7489' + opacityColor
                                }
                            });
                        }}
                        onEndReached={()=>{
                            this.getUserThread()
                        }}
                        onEndReachedThreshold={0.01}
                        renderItem= {
                            ({item}) => {
                                return (
                                    <TouchableOpacity onPress={
                                        () => {
                                            push('thread_view',{
                                                tid: item.tid,
                                            })
                                        }
                                    }>
                                        <Text style={{fontSize:14,marginBottom:10, color:"#3e3e3e"}}>{item.date} 收藏了{item.author}的帖子</Text>
                                        <Text style={{fontSize:18,color:"#969696"}}>{item.subject} </Text>

                                    </TouchableOpacity>


                                )
                            }
                        }
                    />
                }

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
    count_row :{flexDirection:"row",padding:10,},
    count_title : {fontSize:12,color:"#ccc", flex:3,textAlign:"center",    lineHeight:19},
    count_value : {fontSize:19,color:"#ee938f", flex:7,textAlign:"left",paddingLeft:15,    lineHeight:19}
});
