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
    TextInput
} from 'react-native';
import Login from './login'
import UserCenterButton from '../model/UserCenterButton';
import Notice from '../model/Notice';
import SmartView from "../model/SmartView";
type Props = {};
YellowBox.ignoreWarnings(['M']);
let {height, width} = Dimensions.get('window');
let message;
export default class user_center extends Component {
    state = {
        message:'',
        show_notice :false,
        notice_fn : false,
        letter_message : [],
        offsetForPlatform:50,
        keyboardVerticalOffset : Platform.OS === 'ios' ? 50 : -190,//键盘抬起高度
        textInputHeight : 30 ,// 输入框高度
    };

    async componentDidMount () {
        // await  this.setState({letter:this.props.navigation.state.params.plid});
        // console.log(this.props.navigation.state.params)
        this.getLetterData();
    }
    getLetterData = async () => {
        let UserToken = await AsyncStorage.getItem("user_token");
        let FormData = 'token='+ UserToken;
        if (this.props.navigation.state.params.plid)
        {
            FormData  += '&plid='+this.props.navigation.state.params.plid ;
        }

        if (this.props.navigation.state.params.to_uid)
        {
            FormData += '&to_uid=' + this.props.navigation.state.params.to_uid;
        }
        // alert(FormData);
        let ReadLetterUrl =  global.webServer + '/app/read_letter';
        fetch(ReadLetterUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: FormData
        }).then((response) => response.json()).then((responseJson) =>
        {
            if (responseJson.data.message)
            {
                this.setState({letter_message : responseJson.data.message,to_uid: responseJson.data.to_uid});
            }

            console.log(FormData)
            console.log(responseJson.data.message)
        });
    };
    submitMessage = async () => {
        let token = await AsyncStorage.getItem('user_token');

        if ( message === '')
        {
            alert ('发帖数据为空'); return false;
        }
        if (!token)
        {
            alert ('未登录'); return false;
        }
        this.refs["INPUT"].blur();
        let formData = 'to_uid=' + this.state.to_uid +'&message='+ message +"&token=" + token;
        // alert(formData);return false;
        let postUrl = global.webServer + "app/send_letter" ;
        this.setState({'message':''});
        fetch(postUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData
        })
        // .then((response) => console.log(response))
            .then((response) => response.json())
            .then((responseJson)=>{
                console.log(responseJson)
                if (responseJson.ret === 200)
                {

                    alert("回复成功!~");

                    this.getLetterData();
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
    render() {
        const {state , goBack ,navigate} = this.props.navigation;


        // console.log(this.state.user_center_data.user_info);
        return (
            <SmartView>
                { this.state.show_notice && <Notice message={this.state.show_notice} fn={this.state.notice_fn} />}
                <View
                    style={{
                        width:width,
                        backgroundColor:"#ee7489",
                        paddingBottom:8,
                        paddingTop:18,
                        // borderBottomWidth:1,
                        // borderColor:"#cccccc",
                        alignItems:"center",
                        flexDirection:"row",
                        flexWrap:"wrap"
                    }}
                >
                    <TouchableOpacity
                        onPress={()=>goBack()}
                        style={{
                            // textAlign: "left",
                            flexDirection:"row",
                            width:70,
                            // marginRight:width-130
                        }}>
                        <Image
                            source={source=require('../../image/arrow-left.png')}
                            style={{width: 14, height: 14,borderRadius:5, marginLeft:10}} />

                        <Text
                            style={{fontSize:16, paddingBottom:5,color:"#fff"}}
                        >返回</Text>

                    </TouchableOpacity>
                    {
                        this.state.user &&
                        <View>
                            <Text style={{width:width-130,textAlign:"center",fontWeight:"700",color:"#fff",fontSize:14,position:"relative",bottom:2}}>
                                {this.state.user.user_info.username}
                            </Text>
                        </View>
                    }

                </View>
                <ScrollView style={{height:height-100,backgroundColor:"#f0f0f0",paddingTop:20}}>
                    {
                        JSON.stringify(this.state.letter_message) !== '[]'
                        ?
                        <FlatList
                            data={this.state.letter_message}
                            extraData={this.state.show_panel}
                            keyExtractor = {  (item) => item.message + item.authorid}
                            style={{padding:5,marginBottom:90,}}
                            // numColumns={5}
                            // showsHorizontalScrollIndicator= {false}//隐藏水平滚动条
                            showsVerticalScrollIndicator= {false}//隐藏竖直滚动条
                            onEndReached = {this.fetchMore}
                            onEndReachedThreshold = {0.1}

                            onRefresh={this.refreshingData}
                            refreshing={this.state.isRefresh}
                            // horizontal={true} //水平布局
                            renderItem= {({item}) => {
                                return (
                                    <View style={{width:width, padding:10,flexDirection:"row"}}>
                                        <TouchableOpacity >
                                            <Image source={{uri: item.avatar}} style={{width: 50, height: 50,borderRadius:25,}} />
                                            <Text style={{fontSize:11,width:50,overflow:"hidden",marginTop:10, color:"#505050"}} numberOfLines={1}>{item.username}</Text>
                                        </TouchableOpacity>
                                        <View style={{
                                            width: 0,
                                            height: 0,
                                            borderTopWidth: 7,
                                            borderTopColor: 'transparent',
                                            borderRightWidth: 10,
                                            borderRightColor: '#fff',
                                            borderLeftWidth: 5,
                                            borderLeftColor: 'transparent',
                                            borderBottomWidth: 7,
                                            borderBottomColor: 'transparent',
                                            position:"relative",
                                            left:0,
                                            top:15
                                        }} />
                                        <View style={{width:width-90,padding:10,backgroundColor:"#fff",marginRight:10,borderRadius:5}}>

                                            <Text style={{width:width-110,color:"#484848"}}>{item.message}</Text>

                                            <Text style={{width:width-110,color:"#8a8a8a",marginTop:20}}>{item.dateline}</Text>
                                        </View>
                                    </View>
                                )}}
                        />
                        :
                        <View>
                            <Text style={{color:"#828282",fontSize:15, textAlign:"center",width:width}}>暂时还没有互动消息~</Text>
                        </View>
                    }

                </ScrollView>


                <KeyboardAvoidingView style={styles.floatBar}  behavior="padding" keyboardVerticalOffset={this.state.keyboardVerticalOffset} >

                    <TextInput
                        multiline={true}
                        value={this.state.message}
                        ref={"INPUT"}
                        underlineColorAndroid="transparent"
                        onContentSizeChange={(event) => {
                            if( event.nativeEvent.contentSize.height  > 30 && event.nativeEvent.contentSize.height  < 60 )
                            {
                                // maxHeight = event.nativeEvent.contentSize.height > 50 ? 50 :event.nativeEvent.contentSize.height
                                this.setState({
                                    textInputHeight: event.nativeEvent.contentSize.height,
                                    keyboardVerticalOffset : this.state.keyboardVerticalOffset + event.nativeEvent.contentSize.height - 30
                                })
                            }
                        }}
                        // onChangeText={(text) => {message = text}}
                        onChangeText={(text) => {
                            if(Platform.OS==='android'){
                                //如果是android平台
                                this.setState({message:text});
                            }
                            message = text
                        }}
                        style={{width:width-50,paddingVertical: 0,backgroundColor:"#fff",height:this.state.textInputHeight, maxHeight:60,marginTop:7,borderRadius:3,paddingLeft:10,marginLeft:5,borderColor:"#ccc",borderWidth:1,
                        }}/>


                    <TouchableOpacity style={{width:35,marginLeft:3,alignItems:"center"}} onPress={this.submitMessage}>
                        <Image  source={source=require('../../image/reply.png')}
                                style={styles.floatButton}/>
                    </TouchableOpacity>


                </KeyboardAvoidingView>
            </SmartView>
        );
    }
}

const styles = StyleSheet.create({
    smImage : {
        width: 14, height:14,
        marginLeft:5,
        marginRight:5
    },
    floatButton : {
        width: 20, height:20, marginTop:7.5,
    },
    floatBar : {
        backgroundColor:"#fafafa",
        borderColor:"#ccc",
        borderTopWidth:1,
        borderBottomWidth:1,
        width:width,
        height:45,
        bottom:0,
        // left:(width-180)/2,
        // borderRadius:5,
        flexDirection:"row"
    }
});
