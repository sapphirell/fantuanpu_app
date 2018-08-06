import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    navigate,
    FlatList,
    ImageBackground,
    ScrollView,
    AsyncStorage,
    Image, YellowBox,
    Dimensions,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import Login from './login'
import UserCenterButton from '../model/UserCenterButton';
import WebImage from '../model/WebImage'
import UploadImage from '../model/upload_image'
let {height, width} = Dimensions.get('window');
//图文列表
const imageTextList = (data) => {
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
        console.log(data.dataArr);
        data.regImg = new RegExp(/^\[img.+?\[\/img\]$/);
        data.regQuote = new RegExp(/^\[.*?quote.*?\][\w\W]*?\[\/.*?quote\]$/);


    }

    return (
        <View style={{width:width}}>
            {
                data ? data.dataArr.map(
                    (content) => {
                        // console.log(content)
                        return (
                            <View key={ typeof(content)=== 'string' ? content  + Math.random() : content.toString()+ Math.random() }  >
                                {
                                    data.regImg.test(content) === true ?
                                        <WebImage uri = { content.replace(/\[img.*?\]/,'').replace(/\[\/img\]/,'')} />
                                        :
                                        (data.regQuote.test(content) === true ?
                                                <Text key={Math.random()} style={{width:width,paddingRight:30,fontStyle:"italic",fontSize:11,fontColor:"#ccc"}}> 回复 @ {content.replace(/\[blockquote[\w\W]*?\]/,'').replace(/\[\/blockquote\]/,'').replace(/\[quote[\w\W]*?\]/,'').replace(/\[\/quote\]/,'')}</Text>
                                                :
                                                <Text key={Math.random()} style={{width:width,paddingRight:30,}}>{content}</Text>
                                        )
                                }
                            </View>


                        )
                    }
                ) :
                    <Text>帖子不存在</Text>

            }
        </View>

    );
};

let message ;
export default class thread_view extends Component {

    async componentWillMount() {
        await this.setState({tid:this.props.navigation.state.params.tid});
        let forumData = "tid=" + this.props.navigation.state.params.tid ;
        this.getThreadData(forumData);

    }
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
        if (data.ret != 200)
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
                    this.setState({'message':''});
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
        tid:0,
        subject:'',
        keyboardVerticalOffset : 50 ,//键盘抬起高度
        textInputHeight : 30 ,// 输入框高度
        upload_status : 'free',
    };

    render() {
        const { state , navigate, goBack ,props} = this.props.navigation;
        // console.log(this.state.post_data);
        let _keyExtractor = (item) =>  item.dateline +Math.random();

        return (
            <View style={styles.container}>

                <View
                    style={{
                        width:width,
                        paddingBottom:8,
                        paddingTop:38,
                        flexDirection:"row",
                        flexWrap:"wrap",
                        backgroundColor:"#ff6888"
                    }}
                >
                    <TouchableOpacity
                        onPress={()=>goBack()}
                        style={{
                        // textAlign: "left",
                        flexDirection:"row",
                        width:70,
                            marginRight:width-180
                    }}>
                        <Image
                            source={source=require('../../image/arrow-left.png')}
                            style={{width: 14, height: 14,borderRadius:5, marginLeft:10}} />

                        <Text
                            style={{fontSize:16, paddingBottom:5,color:"#fff"}}
                        >返回</Text>

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
                <ScrollView style={{
                    height:height,
                    margin:5,
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
                            <Text style={{width:width-80, fontSize:16,paddingLeft:2,marginBottom:8}}>[{this.state.thread_data && this.state.thread_data.author}] : {this.state.thread_data && this.state.thread_data.subject}</Text>
                            <View style={{flexDirection:"row",paddingBottom:15,paddingLeft:2,}}>
                                <Text style={{ color:"#545454",fontSize:13}}>2018-09-04</Text>
                                <Image
                                    source={source=require('../../image/post.png')}
                                    style={styles.smImage}
                                />
                                <Text style={{ color:"#545454"}}>{this.state.forum_data && this.state.forum_data.name }</Text>
                                <Image
                                    source={source=require('../../image/history.png')}
                                    style={styles.smImage}
                                />
                                <Text style={{ color:"#545454"}}>{ this.state.thread_data && this.state.thread_data.views}</Text>
                                <Image
                                    source={source=require('../../image/message.png')}
                                    style={styles.smImage}
                                />
                                <Text style={{ color:"#545454"}}>{ this.state.thread_data && this.state.thread_data.replies}</Text>
                            </View>
                            {
                                this.state.post_data && imageTextList(this.state.post_data[0])
                            }
                        </View>
                    }
                    {
                        this.state.post_data &&
                        <FlatList
                            data={this.state.post_data}
                            style={{zIndex:1, borderTopWidth:1,borderColor:"#f4f4f4",paddingTop:5,marginTop:5 }}
                            keyExtractor = {  (item) => item.pid }
                            renderItem= {
                                ({item}) => {
                                    return (
                                        <View style={{marginBottom:15}} >
                                            {item.position !== 1 ?
                                                <View style={{width:width,paddingLeft:20}}>
                                                    <View style={{flexDirection:"row",width:width}} >
                                                        <Image source={{uri: item.avatar}}
                                                               style={{width: 35, height: 35, borderRadius: 17.5,marginRight:10}}/>
                                                        <View style={{marginLeft:5,width:width-50,}}>
                                                            <Text style={{textAlign:"left",width:width}}>{item.author}</Text>
                                                            <Text style={{fontSize:12,color:"#b0b0b0",marginTop:5,flexDirection:"row",width:width}}>
                                                                {item.postdate}
                                                                <TouchableOpacity style={{flexDirection:"row",width:40}}
                                                                                  onPress={()=>{
                                                                                      // console.log(item)
                                                                                      // item.map();
                                                                                      // this.setState({'message':})
                                                                                  }}>
                                                                    <Image source={source=require('../../image/reply-b.png')}
                                                                           style={{width:12,height:12,marginLeft:7,position:"relative",top:2}} />
                                                                    <Text style={{fontSize:12,color:"#b0b0b0",marginLeft:3,position:"relative",top:2}}>回复</Text>
                                                                </TouchableOpacity>
                                                            </Text>

                                                        </View>
                                                    </View>
                                                    <View style={{marginTop:10}}>
                                                        { imageTextList(item) }
                                                    </View>

                                                </View>
                                                :
                                                ""
                                            }
                                        </View>
                                    )
                                }
                            }
                        />
                    }
                </ScrollView>

                <KeyboardAvoidingView style={styles.floatBar}  behavior="padding" keyboardVerticalOffset={this.state.keyboardVerticalOffset} >

                    <TextInput
                        multiline={true}
                        value={this.state.message}
                        ref={"INPUT"}
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
                        onChangeText={(text) => {message = text}}
                        style={{width:250,backgroundColor:"#fff",height:this.state.textInputHeight, maxHeight:60,marginTop:7,borderRadius:3,paddingLeft:10,marginLeft:5,borderColor:"#ccc",borderWidth:1,
                    }}/>


                    <TouchableOpacity style={{width:35,marginLeft:3,alignItems:"center"}} onPress={this.submitMessage}>
                        <Image  source={source=require('../../image/reply.png')}
                                style={styles.floatButton}/>
                    </TouchableOpacity>

                    <UploadImage  style={{width:25,height:25,marginLeft:3,paddingTop:5,alignItems:"center",}}  update_upload_status={this.update_upload_status} />
                </KeyboardAvoidingView>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        height:height,
        // paddingTop:40,
        // alignItems: 'center',
        // backgroundColor: '#78d3e9',
        backgroundColor: '#fff',
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
        backgroundColor:"#fafafa",
        borderTopColor:"#ccc",
        borderTopWidth:1,
        width:width,
        height:45,
        bottom:0,
        // left:(width-180)/2,
        // borderRadius:5,
        flexDirection:"row"
    }
});
