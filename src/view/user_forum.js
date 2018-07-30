/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
// import '../model/root' ;
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    YellowBox,
    Button,
    ImageBackground,
    AsyncStorage,//持久化存储
    FlatList, Dimensions,
    ActionButton

} from 'react-native';
import root from '../model/root'
import thread_view from "./thread_view";
let _keyExtractor = (item) =>  item.subject + item.tid  + item.name;
let {height, width} = Dimensions.get('window');

YellowBox.ignoreWarnings(['M']);
const MyLike = (myLikeData) => {
    return (
        <View style={{flexDirection:"row",backgroundColor:"#fff",width:width,height:height}}>
            {/*<TouchableOpacity style={{bottom:50, right:50,width:130,height:130,position:"absolute",backgroundColor:"#dd8d82"}}>*/}
                {/*<Text>发帖</Text>*/}
            {/*</TouchableOpacity>*/}
            <FlatList
                data={myLikeData.myLikeData}
                keyExtractor = { _keyExtractor }
                style={{ flexDirection:'row',padding:5}}
                // numColumns={5}
                showsHorizontalScrollIndicator= {false}//隐藏水平滚动条
                showsVerticalScrollIndicator= {false}//隐藏竖直滚动条
                horizontal={true} //水平布局
                renderItem= {
                    ({item}) => {
                        return (
                            <TouchableOpacity

                                style={{paddingLeft:20}}>
                                <Image
                                    source={{
                                        uri: global.webServer +item.appimage,
                                    }}
                                    style={{width: 45, height: 45,borderRadius:10,marginTop:5}} />
                                <Text numberOfLines={1} style={{fontSize:10,width:50,overflow:"hidden" ,textAlign:"center",paddingTop:5}}>{item.name}</Text>

                            </TouchableOpacity>
                        )
                    }
                }
            />
            <TouchableOpacity style={{padding:5,paddingRight:20}}>
                <Image
                    source={source=require('../../image/add.png')}
                    style={{width: 50, height: 50,borderRadius:5}} />
                <Text style={{fontSize:10,width:50,overflow:"hidden" ,textAlign:"center",paddingTop:5}}>添加常去</Text>

            </TouchableOpacity>


        </View>

    );
};

const ThreadList = (data) => {
    // console.log(data.data)
    // alert(JSON.stringify(data.data))
    // return (<View/>);
    return (
        <View style={{ paddingBottom:data.isLogin ? 157 : 0,backgroundColor:"#fafafa",width:width,height:height }}>
            <FlatList
                data={data.data}
                style={{zIndex:1}}
                keyExtractor = { _keyExtractor }

                // numColumns={5}
                // showsHorizontalScrollIndicator= {false}//隐藏水平滚动条
                // showsVerticalScrollIndicator = {false}//显示竖直滚动条
                // horizontal={true} //水平布局

                onRefresh={data.onRefresh}
                refreshing={data.refreshing}
                renderItem= {
                    ({item}) => {
                        return (
                            <TouchableOpacity
                                onPress={
                                    () => {
                                        data.navigate('thread_view',{
                                            tid: item.tid,
                                            // callback : () => { this.getUserCenterData(); }
                                        })
                                    }}

                                style={{backgroundColor:"#fff",marginLeft:5,marginRight:8,marginTop:5,width:width-10,padding:5,
                                // borderTopLeftRadius:5,borderTopRightRadius:5,
                                // borderRadius:5,
                                borderLeftWidth:1,borderTopWidth:1,borderRightWidth:1,
                                borderColor:"#e5e2ee"
                            }}>
                                <View style={{overflow:"hidden" ,paddingTop:5}} >
                                    <View style={{width:width-10,flexDirection:"row"}}>
                                        {item.avatar && item.avatar.indexOf("noavatar") == -1 ?
                                            <Image
                                                source={{
                                                    uri:  item.avatar,
                                                }}
                                                style={{width:width*0.08,height:width*0.08,borderRadius:15, marginLeft:8}}
                                            />
                                            :
                                            <Image
                                                style={{width:width*0.08,height:width*0.08,borderRadius:15, marginLeft:8}}
                                                source={source=require('../../image/noavatar_middle.gif')}/>

                                        }

                                        <Text
                                            numberOfLines={1}
                                            style={{fontSize:12,width:width*0.9,overflow:"hidden" ,textAlign:"left",paddingLeft:15,paddingTop:5,flexDirection:"row"}}>
                                            {item.subject}
                                        </Text>
                                    </View>

                                    <Text
                                        numberOfLines={1}
                                        style={{fontSize:10,width:width-10,overflow:"hidden" ,textAlign:"left",paddingTop:5}}
                                    >
                                        {item.last_post_date}
                                    </Text>
                                    {/*<Text>{item.tid}</Text>*/}
                                    <Text
                                        numberOfLines={1}
                                        style={{fontSize:10,width:width*0.8,overflow:"hidden" ,textAlign:"left",paddingTop:5}}
                                    >
                                        跟帖
                                    </Text>
                                </View>


                            </TouchableOpacity>
                        )
                    }
                }
            />
        </View>
    );
};
export default class user_forum extends Component  {

    // async getThreadList()
    getThreadList = async () =>
    {

        //判断是否登录。
        let isLogin = await AsyncStorage.getItem('user_token');
        // console.log(isLogin);
        let forumData = isLogin ? "token=" +  isLogin : '';
        let dataUrl = global.webServer + '/app/look_look';
        let data = await fetch(dataUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: forumData
        }).then((response)=> {return response.json()});
        // console.log(data.data.thread_list);
        if (data.ret != 200)
            alert(data.msg);
        else
        {
            if (isLogin)
                this.setState({myLikeData : data.data.user_like_forum, isLogin :isLogin ,thread_list :data.data.thread_list});
            else
                this.setState({isLogin :isLogin ,thread_list :data.data.thread_list});
            // console.log(this.state)

        }

    };
    async componentDidMount() {
        if (JSON.stringify(this.state.myLikeData) == '[]')
        {
            let myLikeData = await AsyncStorage.getItem('my_like');
            if (myLikeData)
            {
                this.setState({myLikeData : myLikeData});
            }
            else
            {
                this.getThreadList()
            }
        }
    }

    state = {
        myLikeData : [],
        thread_list : [],
        forum_data : {},
        isLogin : false ,//false或user_token
        isRefresh :false
    };

    render() {
        const { navigate } = this.props.navigation;
        // console.log(this.state.thread_list)
        // console.log(this.state.forum_data)
        return (
            <View style={{paddingTop:20,width:width,backgroundColor:"#fff"}}>
                {
                    this.state.isLogin ?

                    <View style={styles.myLike}>

                        <MyLike myLikeData={this.state.myLikeData} />
                    </View>
                :
                    <View style={{height:0}}/>
                }
                { this.state.isLogin &&
                    <TouchableOpacity
                        onPress={
                            () => navigate('new_thread',{
                                id: 123,
                                callback : () => {  }
                            })
                        }
                        style={{bottom:250,alignItems:"center", right:20,
                        shadowOffset: {width: 2, height: 3},
                        shadowOpacity: 0.5,
                        shadowRadius: 3,
                        shadowColor: "#ff6888",
                        width:50,height:50,borderRadius:25,position:"absolute",backgroundColor:"#ee7489",zIndex:99}}>
                        <Image
                            style={{width:35,height:35,borderRadius:15,marginTop:7.5}}
                            source={source=require('../../image/post.png')}/>
                    </TouchableOpacity>
                }
                <ThreadList
                    onRefresh={this . getThreadList}
                    refreshing={this.state.isRefresh}
                    isLogin={this.state.isLogin}
                    data={this.state.thread_list}
                    navigate={navigate}
                />



            </View>
        );
    }
}

const styles = StyleSheet.create({
    loginButton : {

    },
    myLike : {
        height:80,
        width: width,
        // borderBottomWidth:1,
        // borderBottomColor:"#ccc"
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: "#ee7489",

    }
});
