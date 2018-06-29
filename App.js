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
    "看看" : {screen: user_forum},
    "消息" : {screen: message},
    "好友" : {screen: friends},
    "我的": {screen: user_center},

},{
    tabBarPosition : 'bottom',
    tabBarOptions : {
        activeTintColor : '#ddd',
        inactiveTintColor : '#fff',
        labelStyle : {
            fontSize :14,
            marginBottom:20
        },
        style : {
            backgroundColor:'#000000'
        }
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