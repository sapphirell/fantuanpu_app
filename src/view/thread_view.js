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

let {height, width} = Dimensions.get('window');
export default class thread_view extends Component {

    async componentWillMount() {
        await this.setState({tid:this.props.navigation.state.params.tid});
        // let forumData = isLogin ? "token=" +  isLogin : '';
        // let dataUrl = global.webServer + '/app/look_look';
        // let data = await fetch(dataUrl, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     body: forumData
        // }).then((response)=> {return response.json()});
        // // console.log(data.data.thread_list);
        // if (data.ret != 200)
        //     alert(data.msg);
        // else
        // {
        //     if (isLogin)
        //         this.setState({myLikeData : data.data.user_like_forum, isLogin :isLogin ,thread_list :data.data.thread_list});
        //     else
        //         this.setState({isLogin :isLogin ,thread_list :data.data.thread_list});
        //     // console.log(this.state)
        //
        // }

    }

    componentDidMount() {
        alert(this.state.tid)
    }
    state = {
        is_login : false,
        tid:0,
        user_token : false,
        thread_data : {},
        post_data :[]
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
                <View style={{
                    margin:5,
                    width:width,
                    flexDirection:"row",
                    flexWrap:"wrap",
                    padding:15
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
                            style={{height:50,flexDirection:"row",width:width-90,flexWrap:"wrap",paddingTop:5,marginLeft:8}}
                        >
                            <Text style={{width:width-80, fontSize:16}}>[发帖人] : 帖子标题</Text>
                            <View style={{flexDirection:"row",paddingTop:5,}}>
                                <Text style={{ color:"#545454"}}>2018-09-04</Text>
                                <Image
                                    source={source=require('../../image/post.png')}
                                    style={styles.smImage}
                                />
                                <Text style={{ color:"#545454"}}>红茶馆</Text>
                                <Image
                                    source={source=require('../../image/history.png')}
                                    style={styles.smImage}
                                />
                                <Text style={{ color:"#545454"}}>22</Text>
                                <Image
                                    source={source=require('../../image/reply.png')}
                                    style={styles.smImage}
                                />
                                <Text style={{ color:"#545454"}}>33</Text>
                            </View>

                        </View>
                    }

                </View>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        paddingTop:40,
        alignItems: 'center',
        // backgroundColor: '#78d3e9',
        backgroundColor: '#fff',
    },
    smImage : {
        width: 14, height:14,
        marginLeft:5,
        marginRight:5
    }
});
