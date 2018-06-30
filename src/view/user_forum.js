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
    FlatList, Dimensions

} from 'react-native';
import root from '../model/root'
let _keyExtractor = (item) =>  item.name ;
let {height, width} = Dimensions.get('window');
const MyLike = (myLikeData) => {
    return (
        <View style={{flexDirection:"row",backgroundColor:"#fff"}}>
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
                            <TouchableOpacity style={{paddingLeft:20}}>
                                <Image
                                    source={{
                                        uri: 'https://fantuanpu.com/Image/user_ava/images/000/00/00/01_avatar_middle.jpg',
                                    }}
                                    style={{width: 50, height: 50,borderRadius:5}} />
                                <Text style={{fontSize:10,width:50,overflow:"hidden" ,textAlign:"center",paddingTop:5}}>{item.name}</Text>

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
    // return (<View/>);
    return (
        <View>
            {/*<Text>主题</Text>*/}
            <FlatList
                data={data.data}
                keyExtractor = { _keyExtractor }
                style={{ flexDirection:'row',height:height-51}}
                // numColumns={5}
                showsHorizontalScrollIndicator= {false}//隐藏水平滚动条
                showsVerticalScrollIndicator= {true}//显示竖直滚动条
                // horizontal={true} //水平布局
                renderItem= {
                    ({item}) => {
                        return (
                            <TouchableOpacity style={{backgroundColor:"#fff",marginBottom:8,width:width,margin:5,padding:5}}>
                                <View
                                    style={{flexDirection:"row",overflow:"hidden" ,paddingTop:5,}}
                                >
                                    <Image
                                        source={{
                                            uri: item.avatar,
                                        }}
                                        style={{width:width*0.14,height:width*0.14}}
                                    />
                                    <Text
                                        numberOfLines={1}
                                        style={{fontSize:12,width:width*0.68,overflow:"hidden" ,textAlign:"left",paddingTop:5,flexDirection:"row"}}>

                                        {item.subject}
                                    </Text>
                                    <Text
                                        numberOfLines={1}
                                        style={{fontSize:10,width:width*0.2,overflow:"hidden" ,textAlign:"left",paddingTop:5}}
                                    >
                                        {item.last_post_date}
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
                // console.log(data);
                if (data.ret != 200)
                    alert(data.msg);
                else
                {
                    this.setState({myLikeData : data.data.user_like_forum, isLogin :isLogin ,thread_list :data.data.thread_list});
                    // console.log(this.state)
                }

            }
        }
    }

    state = {
        myLikeData : [],
        thread_list : [],
        forum_data : {},
        isLogin : false //false或user_token
    };

    render() {
        const { navigate } = this.props.navigation;
        console.log(this.state.thread_list)
        // console.log(this.state.forum_data)
        return (
            <View style={{paddingTop:20,width:width,height:height}}>

                {
                    this.state.isLogin ?
                    <View style={styles.myLike}>
                        <Text>我的板块</Text>
                        <MyLike myLikeData={this.state.myLikeData} />
                    </View>
                :
                    <View/>
                }

                        <ThreadList data={this.state.thread_list} />




            </View>
        );
    }
}

const styles = StyleSheet.create({
    loginButton : {

    },
    myLike : {
        // height:100,
        width: width,
        borderBottomWidth:1,
        borderBottomColor:"#ccc"

    }
});
