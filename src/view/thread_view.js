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
import WebImage from '../model/WebImage'
let {height, width} = Dimensions.get('window');
//图文列表
const imageTextList = (data) => {
    if(data)
    {
        data.dataArr= data.message.split(/(\[img.+?\[\/img\])/g);
        console.log(data.dataArr)
        data.reg = new RegExp(/^\[img.+?\[\/img\]$/);
    }

    return (
        <View style={{width:width}}>
            {
                data ? data.dataArr.map(
                    (content) => {
                        return (
                            data.reg.test(content) == true ?
                                <WebImage uri = { content.replace(/\[img.*?\]/,'').replace(/\[\/img\]/,'')} />
                                :
                                <Text style={{width:width,paddingRight:30,}}>{content}</Text>
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

    componentDidMount() {


    }
    state = {
        is_login : false,
        tid:0,
        user_token : false,
        thread_data : {},
        post_data :[],
        forum_data : {}
    };

    render() {
        const { state , navigate, goBack ,props} = this.props.navigation;
        return (
            <View style={styles.container}>

                <View
                    style={{
                        width:width,
                        paddingBottom:8,
                        paddingTop:8,
                        borderBottomWidth:1,
                        borderColor:"#cccccc",
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
                            marginRight:width-130
                    }}>
                        <Image
                            source={source=require('../../image/arrow-left.png')}
                            style={{width: 14, height: 14,borderRadius:5, marginLeft:10}} />

                        <Text
                            style={{fontSize:16, paddingBottom:5,color:"#dd6e73"}}
                        >返回</Text>

                    </TouchableOpacity>

                </View>
                <ScrollView style={{
                    height:height-300,
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
                            style={{flexDirection:"row",width:width-90,flexWrap:"wrap",paddingTop:5,marginLeft:8}}
                        >
                            <Text style={{width:width-80, fontSize:16,paddingLeft:2,marginBottom:8}}>[{this.state.thread_data && this.state.thread_data.author}] : {this.state.thread_data && this.state.thread_data.subject}</Text>
                            <View style={{flexDirection:"row",paddingBottom:5,paddingLeft:2,}}>
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
                                    source={source=require('../../image/reply.png')}
                                    style={styles.smImage}
                                />
                                <Text style={{ color:"#545454"}}>{ this.state.thread_data && this.state.thread_data.replies}</Text>
                            </View>
                            {
                                this.state.post_data && imageTextList(this.state.post_data[0])
                            }
                        </View>
                    }

                </ScrollView>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        height:height,
        paddingTop:40,
        // alignItems: 'center',
        // backgroundColor: '#78d3e9',
        backgroundColor: '#fff',
    },
    smImage : {
        width: 14, height:14,
        marginLeft:5,
        marginRight:5
    }
});
