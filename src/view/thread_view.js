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
        console.log(data.message);
        regArr = data.message.split(/(\[img.+?\[\/img\])|(\[quote[\w\W]+?\[\/quote\])|(\[blockquote[\w\W]+?\[\/blockquote\])/);
        dataArr = [];
        regArr.map((data,key)=>{if(data !== undefined) {
            dataArr.push(data)
        }});
        data.dataArr = dataArr;
        // console.log(data.dataArr);
        data.regImg = new RegExp(/^\[img.+?\[\/img\]$/);
        data.regQuote = new RegExp(/^\[.*?quote.*?\][\w\W]*?\[\/.*?quote\]$/);


    }

    return (
        <View style={{width:width}}>
            {
                data ? data.dataArr.map(
                    (content) => {
                        return (
                            data.regImg.test(content) === true ?
                                <WebImage uri = { content.replace(/\[img.*?\]/,'').replace(/\[\/img\]/,'')} />
                                :
                                (data.regQuote.test(content) === true ?
                                        <Text style={{width:width,paddingRight:30,fontStyle:"italic",fontSize:11,fontColor:"#ccc"}}> 回复 @ {content.replace(/\[blockquote[\w\W]*?\]/,'').replace(/\[\/blockquote\]/,'').replace(/\[quote[\w\W]*?\]/,'').replace(/\[\/quote\]/,'')}</Text>
                                    :
                                        <Text style={{width:width,paddingRight:30,}}>{content}</Text>
                                )
                               
                        )
                    }
                ) : <Text>帖子不存在</Text>

            }
        </View>

    );
};

export default class thread_view extends Component {

    async componentWillMount() {
        await this.setState({tid:this.props.navigation.state.params.tid});
        let forumData = "tid=" + this.props.navigation.state.params.tid ;
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
            })
        }

    }
    _textAreaOnChange = (data) => {this.setState({"message":data})};
    update_upload_status = (status,url) => {
        if (url)
        {
            this.setState({upload_status:status,content:this.state.content+"[img]"+url+"[/img]"});
        }
        else
        {
            this.setState({upload_status:status});
        }

    };
    componentDidMount() {


    };

    state = {
        is_login : false,
        tid:0,
        user_token : false,
        thread_data : {},
        post_data :[],
        forum_data : {},
        message : "",

    };

    render() {
        const { state , navigate, goBack ,props} = this.props.navigation;
        // console.log(this.state.post_data);
        let _keyExtractor = (item) =>  item.dateline;

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
                    <View style={{flexDirection:"row",width:70}}>
                        <Text style={{color:"#fff",fontSize:13,}}>上传中...</Text>

                        <Image
                            source={source=require('../../image/loading.gif')}
                            style={{width: 15, height: 15,borderRadius:5, marginLeft:10}} />
                        />
                    </View>

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
                            keyExtractor = { _keyExtractor }
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
                                                                <TouchableOpacity style={{flexDirection:"row",width:40}}>
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

                <KeyboardAvoidingView style={styles.floatBar}  behavior="padding" keyboardVerticalOffset="45" >

                    <TextInput
                        multiline={true}
                        value={this.state.message}
                        onChangeText={this._textAreaOnChange}
                        style={{width:250,backgroundColor:"#fff",height:30, marginTop:7,borderRadius:3,paddingLeft:10,marginLeft:5,borderColor:"#ccc",borderWidth:1,
                    }}/>

                    <UploadImage  style={{width:35,marginLeft:3,alignItems:"center"}} />
                    <TouchableOpacity style={{width:35,marginLeft:3,alignItems:"center"}}>
                        <Image  source={source=require('../../image/reply.png')}
                                style={styles.floatButton}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:35,marginLeft:5,alignItems:"center"}}>
                        <Image  source={source=require('../../image/upimage.png')}
                                style={{width: 18, height:18, marginTop:9.5,}}/>
                    </TouchableOpacity>
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
