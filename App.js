import React, { Component } from 'react';
import {
    Image
} from  'react-native';

import {
    StackNavigator,
    TabNavigator,

} from 'react-navigation';

import login from './src/view/login';
import user_center from './src/view/user_center';
import forum from './src/view/forum';
import message from './src/view/message';
import {YellowBox} from "react-native";
import friends from "./src/view/firends";
import user_forum from "./src/view/user_forum";

YellowBox.ignoreWarnings(['Warning:']);
YellowBox.ignoreWarnings(['T']);
YellowBox.ignoreWarnings(['M']);
global.webServer = 'http://localhost:8000/';

const Tab = TabNavigator({
    // "登录": {screen: login},
    "主页": { screen: user_forum,
        navigationOptions: {
            tabBarIcon: () => ( <Image source={require('./image/look.png')} style={{width:25,height:25,margin:10}}/> ),
            activeTintColor : '#000',
            inactiveTintColor : '#6d6d6d',
        }
    },
    // "论坛" : {screen: forum},
    "消息" : { screen: message,
        navigationOptions: {
            tabBarIcon: () => ( <Image source={require('./image/message.png')} style={{width:25,height:25,margin:10}}/> ),
            activeTintColor : '#000',
            inactiveTintColor : '#6d6d6d',
        }
    },
    "好友" :  { screen: friends,
        navigationOptions: {
            tabBarIcon: () => ( <Image source={require('./image/friend.png')} style={{width:25,height:25,margin:10}}/> ),
            activeTintColor : '#000',
            inactiveTintColor : '#6d6d6d',
        }
    },
    "我的":  { screen: user_center,
        navigationOptions: {
            tabBarIcon: () => ( <Image source={require('./image/mine.png')} style={{width:25,height:25,margin:10}}/> ),
            activeTintColor : '#000',
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
            backgroundColor:'#eee',
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
        login: {screen: login},
        user_center: {screen: user_center},
    }
    ,{
        //screen模式才可以隐藏导航header,none为全局隐藏
        headerMode: 'none'
    });

export default App;