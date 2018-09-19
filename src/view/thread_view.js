import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    navigate,
    FlatList,
    ActivityIndicator,
    ImageBackground,
    ScrollView,
    AsyncStorage,
    Image, YellowBox,
    Dimensions,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Clipboard
} from 'react-native';
import Login from './login'

import WebImage from '../model/WebImage'
import UploadImage from '../model/upload_image'
import SmartView from '../model/SmartView'
import Notice from '../model/Notice'
import ImageTextList from '../model/ImageTextList'

import {StatusBar} from 'react-native';
console.log('statusBarHeight: ', StatusBar.currentHeight);


let {height, width} = Dimensions.get('window');
//图文列表


let message ;
export default class thread_view extends Component {

    async componentWillMount() {
        if (this.props.navigation.state.params.pid)
        {
            await this.setState({pid:this.props.navigation.state.params.pid});
            let forumData = "pid=" + this.props.navigation.state.params.pid ;
            this.getThreadData(forumData);
        }
        else
        {
            await this.setState({tid:this.props.navigation.state.params.tid});
            let forumData = "tid=" + this.props.navigation.state.params.tid ;
            this.getThreadData(forumData);
        }



    }
    imageTextList = (data) => {
        if(data)
        {
            // data.dataArr= data.message.split(/(\[img.+?\[\/img\])/g);
            // console.log(data.message);
            regArr = data.message.split(/(\[img.+?\[\/img\])|(\[quote[\w\W]+?\[\/quote\])|(\[blockquote[\w\W]+?\[\/blockquote\])/);
            dataArr = [];
            regArr.map((data,key)=>{
                if(data !== undefined && data !== "" ) {
                    dataArr.push(data)
                }
            });
            data.dataArr = dataArr;
            // console.log(data.dataArr);
            data.regImg = new RegExp(/^\[img.+?\[\/img\]$/);
            data.regQuote = new RegExp(/^\[.*?quote.*?\][\w\W]*?\[\/.*?quote\]$/);


        }
        // return (<View><Text>?</Text></View>);

        return (
            <View style={{width:width}}>

                {
                    data ? data.dataArr.map(
                        (content) => {
                            // console.log(content)
                            return (

                                <View key={ typeof(content)=== 'string' ? content  : content.toString() }  >

                                    {
                                        data.regImg.test(content) === true ?
                                            <WebImage style={{zIndex:1}} uri = { content.replace(/\[img.*?\]/,'').replace(/\[\/img\]/,'')} />
                                            :
                                            (data.regQuote.test(content) === true ?
                                                    <Text key={Math.random()} style={{width:width,paddingRight:30,fontStyle:"italic",fontSize:11,color:"#ccc"}}> 回复 @ {content.replace(/\[blockquote[\w\W]*?\]/,'').replace(/\[\/blockquote\]/,'').replace(/\[quote[\w\W]*?\]/,'').replace(/\[\/quote\]/,'')}</Text>
                                                    :
                                                    <Text key={Math.random()} style={{width:width,paddingRight:30,}}>{content}</Text>
                                            )
                                    }
                                </View>
                            )
                        }
                        )
                        :
                        <Text>帖子正在加载ヾ(◍°∇°◍)ﾉﾞ</Text>
                }
            </View>

        );
    };
    getThreadData = async (forumData) => {
        let dataUrl = global.webServer + '/app/view_thread';
        let data = await fetch(dataUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: forumData
        }).then((response)=> {return response.json()});
        // alert(this.props.navigation.state.params.tid)
        // console.log(data.data);
        if (data.ret !== 200)
            alert(data.msg);
        else
        {
            this.setState({
                thread_data : data.data.thread.thread_subject,
                post_data : data.data.thread.thread_post,
                forum_data : data.data.forum,
                fid : data.data.thread.thread_subject.fid,
                tid : data.data.thread.thread_subject.tid,
                subject : data.data.thread.thread_subject.subject,
            })
        }
    };

    add_my_like_thread = async () => {
        if (!this.state.tid)
        {
            this.setState({show_notice:"帖子尚未加载完成，请稍后~",notice_fn: () => {
                    this.setState({show_notice:false,notice_fn:false,show_more:false})
                }})
        }

        let dataUrl = global.webServer + '/app/add_my_like';
        let forumData = 'like_id='+this.state.tid+'&form=app&token='+this.state;
        let data = await fetch(dataUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: forumData
        }).then((response)=> {
            return response.json()

        });
        // alert(this.props.navigation.state.params.tid)
        console.log(data);
        if (data.ret !== 200)
            alert(data.msg);
        else
        {
            this.setState({show_notice:"已经添加至\'我的喜欢\'",notice_fn: () => {
                    this.setState({show_notice:false,notice_fn:false,show_more:false})
                }})
        }

        return false;
    }
    update_upload_status = (status,url) => {
        if (url)
        {
            // alert(message)
            this.setState({upload_status:status,message:message+"[img]"+url+"[/img]"});
            message = message +"[img]"+url+"[/img]";
            this.refs["INPUT"].focus();
        }
        else
        {
            this.setState({upload_status:status});
        }

    };
    submitMessage = async () => {
        console.log(message);
        // return false;
        let token = await AsyncStorage.getItem('user_token');
        if (!this.state.fid) {
            alert('未获取到板块信息');
            return false;
        }
        if (!this.state.tid) {
            alert('未获取到帖子id');
            return false;
        }
        if (!this.state.subject)
        {
            alert ('未获取到帖子主题'); return false;
        }
        if ( message === '')
        {
            alert ('发帖数据为空'); return false;
        }
        if (!token)
        {
            alert ('未登录'); return false;
        }
        this.refs["INPUT"].blur();
        let formData =  'fid='+this.state.fid
                        +'&tid='+this.state.tid
                        +'&subject='+this.state.subject
                        +'&message='+ message
                        +"&token=" + token;

        let postUrl = global.webServer + "app/reply_thread" ;
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

                    alert("回帖成功!~");

                    this.getThreadData("tid=" + this.state.tid);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
    componentDidMount() {

    };
    layoutSetState = (key,value,time=500) => {
        layfn = value
        // clearTimeout(layfn);
        // layfn = setTimeout (() => {
        //     console.log(value);
        //     this.setState({key:value})
        // }, time) ;

    };
    state = {
        is_login : false,
        tid:0,
        user_token : false,
        thread_data : {},
        post_data :[],
        forum_data : {},
        message : "",
        fid:0,
        subject:'',
        offsetForPlatform:50,
        keyboardVerticalOffset : Platform.OS === 'ios' ? 50 : -190,//键盘抬起高度
        textInputHeight : 30 ,// 输入框高度
        upload_status : 'free',
        show_more : false, //是否显示更多菜单
        show_notice :false,
        notice_fn : false,
    };

    render() {
        const { state , navigate, goBack ,props ,push} = this.props.navigation;
        // console.log(this.state.post_data);
        let _keyExtractor = (item) =>  item.dateline +Math.random();

        return (
            <SmartView style={styles.container} colorType="back" >
                { this.state.show_notice && <Notice message={this.state.show_notice} fn={this.state.notice_fn} />}
                <StatusBar
                    animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
                    hidden={false}  //是否隐藏状态栏。
                    backgroundColor={'black'} //状态栏的背景色
                    // translucent={true}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
                    barStyle={'light-content'} // enum('default', 'light-content', 'dark-content')
                >
                </StatusBar>
                <View
                    style={{
                        width:width,
                        // paddingBottom:8,
                        paddingTop:18,
                        height:45,
                        flexDirection:"row",
                        flexWrap:"wrap",
                        backgroundColor:"#ee7489",
                        shadowOffset: {width: 2, height: 5},
                        shadowOpacity: 0.5,
                        shadowRadius: 3,
                        shadowColor: "#0000005e",
                        elevation: 2,
                    }}
                >
                    <TouchableOpacity
                        onPress={()=>goBack()}
                        style={{
                            // textAlign: "left",
                            flexDirection:"row",
                            width:40,
                            // marginRight:width-180,
                            marginTop:5
                        }}>
                        <Image
                            source={source=require('../../image/left-w.png')}
                            style={{width: 14, height: 14,borderRadius:5, marginLeft:10}} />

                        {/*<Text*/}
                            {/*style={{fontSize:16, paddingBottom:5,color:"#fff"}}*/}
                        {/*>返回</Text>*/}

                    </TouchableOpacity>
                    {
                        this.state.thread_data ?
                            <TouchableOpacity
                                style={{width:width - 120,flexDirection:"row"}}
                                onPress={()=>{
                                push('user_view',{
                                    view_uid: this.state.thread_data.authorid,
                                })
                            }}>
                                <Image
                                    source={{
                                        uri:  this.state.thread_data.avatar,
                                    }}
                                    style={{width:25, height:25,borderRadius:12.5}}
                                />
                                <Text  style={{maxWidth:100,textAlign:"left",color:"#fff",lineHeight:25,marginLeft:10}}>{this.state.thread_data.author}</Text>
                            </TouchableOpacity>
                            :
                            <Text style={{width:width-120}}>加载帖子中...</Text>
                    }
                   
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
                    {
                        this.state.upload_status !== 'uploading...' &&
                            <TouchableOpacity style={{width:20,position:"absolute",right:10,top:global.iphoneCommonPaddingTop + 15}} onPress={()=>this.setState({show_more:!this.state.show_more})}>
                                <Image source={source=require('../../image/more-w.png')}
                                       style={{width: 14, height: 14,borderRadius:5, marginLeft:10}}/>
                            </TouchableOpacity>
                    }

                </View>
                {
                    //弹出分享和喜欢浮窗
                    this.state.show_more &&
                    <View style={{position:"absolute",width:100,height:80,backgroundColor:"#ffffff", top:50,right:10,zIndex:99999,
                        borderRadius:2,
                        shadowOffset: {width: 0, height: 3},
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                        shadowColor: "#0000004d",
                        //注意：这一句是可以让安卓拥有灰色阴影
                        elevation: 2,
                        paddingTop:5
                    }}>
                        <TouchableOpacity style={{width:150,flexDirection:"row"}} onPress={()=>{
                            this.add_my_like_thread();
                        }}>
                            <Image source={source=require('../../image/like-red.png')}
                                   style={{width: 18, height: 18,borderRadius:5, margin:10}}/>
                            <Text style={{textAlign:"center",color:"#3c3c3c", margin:10}}>喜欢</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:150,flexDirection:"row"}} onPress={()=>{
                            Clipboard.setString(global.webServer + 'thread-' + this.state.tid + '-1.html')
                            this.setState({show_notice:"帖子链接已经复制到您的剪贴板~",notice_fn: () => {
                                    this.setState({show_notice:false,notice_fn:false,show_more:false})
                                }})
                        }}>
                            <Image source={source=require('../../image/link.png')}
                                   style={{width: 18, height: 18,borderRadius:5, margin:10}}/>
                            <Text  style={{textAlign:"center",color:"#3c3c3c", margin:10}}>分享</Text>
                        </TouchableOpacity>
                    </View>
                }
                <ScrollView style={{
                    height:height,
                    margin:5,
                    marginTop:0,
                    paddingTop:10,
                    // width:width-20,
                    // flexDirection:"row",
                    width:width,paddingRight:30,
                    flexWrap:"wrap",
                    // padding:15,
                }}>

                    {JSON.stringify(this.state.thread_data) == '{}' ?
                        <Image
                            source={source=require('../../image/noavatar_middle.gif')}
                            style={{width: 50, height: 50,borderRadius:25}}
                        />
                        :
                        <Image/>
                    }

                    {
                        <View
                            style={{flexDirection:"row",width:width-90,flexWrap:"wrap",marginLeft:8}}
                        >
                           
                            <Text style={{width:width-80, fontSize:16,paddingLeft:2,marginBottom:8}}>
                                {this.state.thread_data && this.state.thread_data.subject}
                            </Text>
                       
                    
                            <View style={{flexDirection:"row",paddingBottom:15,paddingLeft:2,}}>
                                <Text style={{ color:"#545454",fontSize:13}}>{this.state.thread_data.dateline}</Text>
                                <Image
                                    source={source=require('../../image/post-b.png')}
                                    style={styles.smImage}
                                />
                                <Text style={{ color:"#545454"}}>{this.state.forum_data && this.state.forum_data.name }</Text>
                                <Image
                                    source={source=require('../../image/history.png')}
                                    style={styles.smImage}
                                />
                                <Text style={{ color:"#545454"}}>{ this.state.thread_data && this.state.thread_data.views}</Text>
                                <Image
                                    source={source=require('../../image/message-b.png')}
                                    style={styles.smImage}
                                />
                                <Text style={{ color:"#545454"}}>{ this.state.thread_data && this.state.thread_data.replies}</Text>
                            </View>

                            {
                                this.state.post_data && this.imageTextList(this.state.post_data[0])
                            }
                        </View>
                    }

                    {
                        this.state.post_data &&
                        <FlatList
                            data={this.state.post_data}
                            style={{zIndex:1, borderTopWidth:1,borderColor:"#f4f4f4",paddingTop:5,marginTop:5 }}
                            keyExtractor = {  (item) => item.message + item.tid }
                            renderItem= {
                                ({item}) => {
                                    return (
                                        <View style={{marginBottom:15}} >
                                            {item.position !== 1 &&
                                                <View style={{width:width,paddingLeft:20}}>
                                                    <View style={{flexDirection:"row",width:width}} >
                                                        <TouchableOpacity onPress={()=>{
                                                            push('user_view',{
                                                                view_uid: item.authorid,
                                                            })
                                                        }}>
                                                            <Image source={{uri: item.avatar}}
                                                                   style={{width: 35, height: 35, borderRadius: 17.5,marginRight:10}}/>
                                                        </TouchableOpacity>

                                                        <View style={{marginLeft:5,width:width-50,}}>
                                                            <Text style={{textAlign:"left",width:width}}>{item.author}</Text>
                                                            <View style={{marginTop:5,flexDirection:"row",width:width}}>
                                                                <Text>{item.postdate}</Text>
                                                                <TouchableOpacity style={{flexDirection:"row",width:60}}
                                                                                  onPress={()=>{
                                                                                      this.refs["INPUT"].focus();
                                                                                      // item.map();
                                                                                      this.setState({'message':"[quote]"+item.message+"[/quote]"})
                                                                                  }}>
                                                                    <Image source={source=require('../../image/reply-b.png')}
                                                                           style={{width:12,height:12,marginLeft:7,position:"relative",top:2}} />
                                                                    <Text style={{fontSize:12,color:"#b0b0b0",marginLeft:3,position:"relative",top:2}}>回复</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View style={{marginTop:10}}>
                                                        { this.imageTextList(item) }
                                                    </View>
                                                </View>
                                            }
                                        </View>
                                    )
                                }
                            }
                        />
                    }

                </ScrollView>
                {/*<View style={{position:"absolute",bottom:50,width:width,height:50,backgroundColor:"#ccc"}}/>*/}
                <KeyboardAvoidingView style={styles.floatBar}
                                      behavior="padding"
                                      keyboardVerticalOffset={this.state.keyboardVerticalOffset}
                >
                    <View style={{width:width,flexDirection:"row"}}>
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
                            style={{paddingVertical: 0,backgroundColor:"#fff",borderStyle : 'dashed',height:this.state.textInputHeight, maxHeight:60,marginTop:7,borderRadius:3,
                                width:width-85,
                                marginRight:10,paddingLeft:5,
                                marginLeft:5,borderColor:"#ccc",borderWidth:1,
                            }}/>
                        <TouchableOpacity style={{width:35,height:35,marginLeft:3}} onPress={this.submitMessage}>
                            <Image  source={source=require('../../image/reply.png')}
                                    style={styles.floatButton}/>
                        </TouchableOpacity>
                        <UploadImage  style={{width:25,height:25,marginRight:5,paddingTop:5,alignItems:"center"}}  update_upload_status={this.update_upload_status} />

                    </View>


                </KeyboardAvoidingView>
            </SmartView>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        zIndex:99
        // flex: 1,
        // justifyContent: 'center',
        // height:height,
        // paddingTop:40,
        // alignItems: 'center',
        // backgroundColor: '#78d3e9',
        // backgroundColor: '#fff',
    },
    smImage : {
        width: 14, height:14,
        marginLeft:5,
        marginRight:5
    },
    floatButton : {
        width: 20, height:20, marginTop:7.5,
    },
    floatBar : {
        backgroundColor:"#fff",
        borderColor:"#fff",
        borderTopWidth:1,
        borderBottomWidth:1,
        width:width,
        height:45,
        bottom:0,
        // left:(width-180)/2,
        // borderRadius:5,
        flexDirection:"row",
        shadowOffset: {width: 2, height: -3},
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowColor: "#cacaca",
        elevation: 2,
    }
});
