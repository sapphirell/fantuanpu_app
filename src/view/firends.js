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

export default class friends extends Component  {
    FriendList = (my_friends) => {
        return (
            <FlatList
                data={this.state.my_friends}
                keyExtractor = { _keyExtractor }
                style={{padding:5,marginBottom:90, minHeight:50, flex:1}}
                // numColumns={5}
                // showsHorizontalScrollIndicator= {false}//隐藏水平滚动条
                showsVerticalScrollIndicator= {false}//隐藏竖直滚动条
                onEndReached = {this.fetchMore}
                onEndReachedThreshold = {0.1}
                extraData={this.state}
                onRefresh={this.refreshingData}
                refreshing={this.state.isRefresh}
                // horizontal={true} //水平布局
                renderItem= {
                    ({item}) => {
                        return (
                            <TouchableOpacity style={{paddingLeft:20,flexDirection:"row", margin:10,
                                opacity:
                                    this.state.show_panel === false ? 1 : (
                                        this.state.show_panel === item.fuid ? 1 : 0.1
                                    )
                            }} onPress={()=>{
                                this.setState({show_panel:item.fuid});
                            }}>
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
        page:0,
        show_panel:false,
        re_shadow:false,
        search_focus:false
    };

    render() {
        const { navigate } = this.props.navigation;
        // console.log(this.state.my_friends);
        return (
            <View style={{paddingTop:10,width: width,height:height,backgroundColor:"#fff"}}>
                {
                    this.state.show_panel &&
                    <View style={{position:"absolute",width:width,height:height,zIndex:10, }} >
                        <View style={{top:height*0.3,width:150,left:(width-150)/2,
                            shadowOffset: {width: 0, height: 5},
                            shadowOpacity: 0.8,
                            shadowRadius: 5,
                            // borderColor:"#ee7489",
                            // borderWidth:3,
                            shadowColor: "#0202025c",
                            // backgroundColor:"#ffffffdb",
                            backgroundColor:"#ff6888db",
                            borderRadius:5
                        }}>
                            <TouchableOpacity onPress={()=>{alert(this.state.show_panel)}}>
                                <Text style={styles.floatPanelButton}>查看信息</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{
                                navigate('read_letter',{
                                    to_uid: this.state.show_panel,
                                    // callback : () => { this.getUserCenterData(); }
                                })
                            }}>
                                <Text style={styles.floatPanelButton}>发送私信</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>this.setState({show_panel:false})}>
                                <Text style={styles.floatPanelButton}>取消</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                }
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
                    onFocus={()=>{
                         this.setState({search_focus:true});
                    }}
                    onBlur={()=>{
                        this.setState({search_focus:false});
                    }}
                           // onChangeText={}
                >

                </TextInput>
                {
                    this.state.search_focus &&
                    <TouchableOpacity>
                        <Image source={source=require('../../image/return.png')} style={{width:30,height:30,position:"absolute",bottom:16,right:25}} />
                    </TouchableOpacity>

                }


                {
                    this.state.is_login ?
                        <FlatList
                            data={this.state.my_friends}
                            extraData={this.state.show_panel}
                            keyExtractor = { _keyExtractor }
                            style={{padding:5,marginBottom:90, minHeight:50, flex:1}}
                            // numColumns={5}
                            // showsHorizontalScrollIndicator= {false}//隐藏水平滚动条
                            showsVerticalScrollIndicator= {false}//隐藏竖直滚动条
                            onEndReached = {this.fetchMore}
                            onEndReachedThreshold = {0.1}

                            onRefresh={this.refreshingData}
                            refreshing={this.state.isRefresh}
                            // horizontal={true} //水平布局
                            renderItem= {
                                ({item}) => {
                                    return (
                                        <TouchableOpacity style={{paddingLeft:20,flexDirection:"row", margin:10,
                                        }} onPress={()=>{
                                            this.setState({show_panel:item.fuid});
                                        }}>

                                            {
                                                item.favatar && item.favatar.indexOf("noavatar") == -1?
                                                    <Image
                                                        source={{
                                                            uri: item.favatar,
                                                        }}
                                                        style={{width: 65, height: 65,borderRadius:32.5,marginTop:5,
                                                            opacity:
                                                                this.state.show_panel === false ? 1 : (
                                                                    this.state.show_panel === item.fuid ? 1 : 0.1
                                                                )
                                                        }} />
                                                    :
                                                    <Image
                                                        style={{width: 65, height: 65,borderRadius:60,marginTop:5}}
                                                        source={source=require('../../image/noavatar_middle.gif')}/>
                                            }

                                            <Text numberOfLines={10} style={{paddingTop:30,paddingLeft:20,fontSize:14,width:150,overflow:"hidden" ,
                                                opacity:
                                                    this.state.show_panel === false ? 1 : (
                                                        this.state.show_panel === item.fuid ? 1 : 0.1
                                                    ),
                                                textAlign:"left",height:45
                                            }}>
                                                {item.fusername}
                                            </Text>

                                        </TouchableOpacity>
                                    )
                                }
                            }
                        />
                    :
                    <TouchableOpacity onPress={()=> {this.refreshingData()}}  style={{alignItems:"center",width:width,marginTop:20}}>
                        <Image source={source=require('../../image/refresh.png')} style={{width:30,height:30}} />
                    </TouchableOpacity>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loginButton : {

    },
    floatPanelButton : {
        color:"#FFF",
        padding:15,
        fontSize:14,
        textAlign:"left",
        width:150,
        fontWeight:"900"
    }
});
