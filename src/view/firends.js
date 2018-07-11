/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
// import '../model/root' ;
import React, { Component } from 'react';
import {
    Platform,
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    YellowBox,
    Button,
    ImageBackground,
    AsyncStorage,//持久化存储
    FlatList, Dimensions

} from 'react-native';
import root from '../model/root'
let {height, width} = Dimensions.get('window');
let _keyExtractor = (item) =>  item.subject + item.fusername;
const FriendList = (my_friends) => {
    // console.log(JSON.stringify(my_friends));
    return (
        <FlatList
            data={my_friends.data}
            keyExtractor = { _keyExtractor }
            style={{padding:5,marginBottom:90}}
            // numColumns={5}
            // showsHorizontalScrollIndicator= {false}//隐藏水平滚动条
            showsVerticalScrollIndicator= {false}//隐藏竖直滚动条
            onEndReached = { my_friends . onEndReached  }
            onEndReachedThreshold = {0.1}

            onRefresh={my_friends .onRefresh}
            refreshing={my_friends.refreshing}
            // horizontal={true} //水平布局
            renderItem= {
                ({item}) => {
                    return (
                        <TouchableOpacity style={{paddingLeft:20,flexDirection:"row", margin:10}}>
                            {
                                item.favatar && item.favatar.indexOf("noavatar") == -1?
                                    <Image
                                        source={{
                                            uri: item.favatar,
                                        }}
                                        style={{width: 65, height: 65,borderRadius:32.5,marginTop:5}} />
                                    :
                                    <Image
                                        style={{width: 65, height: 65,borderRadius:60,marginTop:5}}
                                        source={source=require('../../image/noavatar_middle.gif')}/>
                            }

                            <Text numberOfLines={10} style={{paddingTop:30,paddingLeft:20,fontSize:14,width:150,overflow:"hidden" ,textAlign:"left",height:45
                            }}>
                                {item.fusername}
                            </Text>

                        </TouchableOpacity>
                    )
                }
            }
        />
    );
};
export default class friends extends Component  {
    refreshingData = async () => {
        let my_friends = await this.getFriendsList(1);
        let is_login = await AsyncStorage.getItem("user_token");
        this.setState({my_friends : my_friends,is_login:is_login,page:2});
    };
    fetchMore = async () => {
        let my_friends = await this.getFriendsList(this.state.page);
        let is_login = await AsyncStorage.getItem("user_token");
        this.setState({my_friends : this.state.my_friends.concat(my_friends),is_login:is_login,page:this.state.page+1});
    };
    getFriendsList = async (page=0) => {
        let is_login = await AsyncStorage.getItem("user_token");
        if (is_login)
        {
            let forumData =  "token=" +  is_login + "&page=" + page;
            let dataUrl = global.webServer + 'app/user_friends';

            let my_friends = await fetch(dataUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: forumData
            }).then((response)=> {return response.json()});

            if (my_friends.ret==200)
            {
                return my_friends.data;
            }
            else
            {
                alert(my_friends.msg + is_login)
                if (my_friends.ret == 39998)
                {
                    global.logout(is_login);
                }
            }
        }

    };


    async componentDidMount() {
        this.refreshingData();
    }

    state = {
        is_login : false,
        my_friends : [],
        isRefresh :false,
        page:0
    };

    render() {
        const { navigate } = this.props.navigation;
        // console.log(this.state.my_friends);
        return (
            <View style={{paddingTop:10,width: width,height:height,backgroundColor:"#fff"}}>
                <TextInput
                    style={{
                        height:50,
                        borderColor:'#eee',
                        backgroundColor:"#eee",
                        borderWidth:1,
                        marginTop:30,
                        marginLeft:15,
                        marginRight:15,
                        paddingLeft:20,
                        borderRadius:10
                }}
                     underlineColorAndroid="transparent"
                     maxLength={30}
                     placeholder={'搜索用户名...'}
                           // onChangeText={}
                >

                </TextInput>
                {
                    this.state.is_login ?
                        <FriendList
                            data={this.state.my_friends}
                            onRefresh={this.refreshingData}
                            refreshing={this.state.isRefresh}
                            onEndReached = { this . fetchMore  }
                            onEndReachedThreshold = {0.1}

                        />

                    : <View/>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loginButton : {

    },

});
