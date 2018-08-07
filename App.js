import React, { Component } from 'react';
import {
    Image,
    AsyncStorage
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
import not_logged from "./src/view/not_logged";
import new_thread from "./src/view/new_thread";
// const ExtraDimensions = require('react-native-extra-dimensions-android');

YellowBox.ignoreWarnings(['Warning:']);
YellowBox.ignoreWarnings(['T']);
YellowBox.ignoreWarnings(['M']);
YellowBox.ignoreWarnings(['R']);
YellowBox.ignoreWarnings(['C']);
YellowBox.ignoreWarnings(['F']);
// global.webServer = 'http://localhost:8000/';
global.webServer = 'https://fantuanpu.com/';
global.logout = (token) => {
    if (!token) return false;
    AsyncStorage.removeItem("user_token");
    AsyncStorage.removeItem("user_center_data" + token);
};
global.version = 1.0;
// const STATUS_BAR_HEIGHT = ExtraDimensions.get('STATUS_BAR_HEIGHT');
// const SOFT_MENU_BAR_HEIGHT = ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT');
// alert(STATUS_BAR_HEIGHT);
const Tab = TabNavigator({
    // "论坛" : {screen: forum},
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
    tabBarPosition : 'bottom',
    animationEnabled: true, // 切换页面时是否有动画效果
    swipeEnabled: true, // 是否可以左右滑动切换tab
    tabBarOptions : {
        activeTintColor : '#000',
        inactiveTintColor : '#ccc',
        labelStyle : {
            fontSize :14,
            marginBottom:5
        },
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {
            height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
        },

        style : {
            backgroundColor:'#ffffff',
            height:60,
            paddingBottom:0,
            marginBottom:0,
            borderTopWidth:0
            // fontSize:10
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
        new_thread : {screen : new_thread}
    }
    ,{
        //screen模式才可以隐藏导航header,none为全局隐藏
        headerMode: 'none'
    });

export default App;