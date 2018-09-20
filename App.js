import React, { Component } from 'react';
import {
    Image,
    AsyncStorage,
    Platform
} from  'react-native';

import {
    StackNavigator,
    TabNavigator,

} from 'react-navigation';

import login from './src/view/login';
import user_center from './src/view/user_center';
import forum from './src/view/forum';
import thread_view from './src/view/thread_view';
import message from './src/view/message';
import {YellowBox} from "react-native";
import friends from "./src/view/firends";
import user_forum from "./src/view/user_forum";
import user_score from "./src/view/user_score";
import not_logged from "./src/view/not_logged";
import new_thread from "./src/view/new_thread";
import read_message from "./src/view/read_message";
import report from "./src/view/report";
import letter from "./src/view/letter";
import read_letter from "./src/view/read_letter";
import user_view from "./src/view/user_view";
import my_thread from "./src/view/my_thread";
import my_like from "./src/view/my_like";





YellowBox.ignoreWarnings(['Warning:']);
YellowBox.ignoreWarnings(['T']);
YellowBox.ignoreWarnings(['M']);
YellowBox.ignoreWarnings(['R']);
YellowBox.ignoreWarnings(['C']);
YellowBox.ignoreWarnings(['F']);
global.webServer = 'http://127.0.0.1:8000/';
// global.webServer = 'https://fantuanpu.com/';
global.logout = (token) => {
    if (!token) return false;
    AsyncStorage.removeItem("user_token");
    AsyncStorage.removeItem("user_center_data" + token);
};
global.iphoneXPaddingTop = 44;
global.iphoneCommonPaddingTop = 5;
global.version = "1.0";
let nav = {};

const Tab = TabNavigator({
    // "论坛" : {screen: forum},
    // "论坛" : {screen: test},
    "主页": { screen: user_forum,
        navigationOptions: {
            tabBarIcon: () => ( <Image source={require('./image/look.png')} style={{width:25,height:25,margin:10}}/> ),
            activeTintColor : '#78d3e9',
            inactiveTintColor : '#6d6d6d',
        }
    },
    "消息" : { screen: message,
        navigationOptions: {
            tabBarIcon: () => ( <Image source={require('./image/message.png')} style={{width:25,height:25,margin:10}}/> ),
            activeTintColor : '#78d3e9',
            inactiveTintColor : '#6d6d6d',
        }
    },
    "好友" :  { screen: friends,
        navigationOptions: {
            tabBarIcon: () => ( <Image source={require('./image/friend.png')} style={{width:25,height:25,margin:10}}/> ),
            activeTintColor : '#78d3e9',
            inactiveTintColor : '#6d6d6d',
        }
    },
    "我的":  { screen: user_center,
        navigationOptions: {
            tabBarIcon: () => ( <Image source={require('./image/mine.png')} style={{width:25,height:25,margin:10}}/> ),
            activeTintColor : '#78d3e9',
            inactiveTintColor : '#6d6d6d',
        }
    },
},{
    // tabBarPosition : 'bottom',
    // animationEnabled: true, // 切换页面时是否有动画效果
    swipeEnabled: true, // 是否可以左右滑动切换tab
    tabBarOptions : {
        activeTintColor : '#fff',
        inactiveTintColor : Platform.OS === 'ios' ? "#cacaca" :'#c58776',
        labelStyle : {
            fontSize :14,
            marginBottom:5
        },
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {
            height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
        },
        style : {
            backgroundColor: Platform.OS === 'ios' ? '#5c5c5c' : "#ff6888",
            height:60,
            paddingBottom:0,
            marginBottom:0,
            borderTopWidth:0,
            // fontSize:10
            shadowOffset: {width: 0, height: -3},
            shadowOpacity: 0.5,
            shadowRadius: 3,
            shadowColor: "#cbcbcb",
        },
        sceneStyle:{ paddingBottom: 0}
    }

});

const App = StackNavigator({
        tab: {screen : Tab},
        thread_view : { screen: thread_view},
        login: {screen: login},
        user_center: {screen: user_center},
        not_logged: {screen: not_logged},
        new_thread : {screen : new_thread},
        read_message : {screen : read_message},
        report : {screen : report},
        user_score : {screen : user_score},
        letter : {screen : letter},
        read_letter : {screen : read_letter},
        user_view : {screen:user_view},
        my_thread : {screen:my_thread},
        my_like : {screen:my_like},
    }
    ,{
        //screen模式才可以隐藏导航header,none为全局隐藏
        headerMode: 'none'
    });

export default App;