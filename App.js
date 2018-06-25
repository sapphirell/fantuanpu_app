import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';

import login from './src/view/login';
import user_center from './src/view/user_center';

global.webServer = 'http://localhost:8000/';

const Tab = TabNavigator({
    // "登录": {screen: login},
    "用户中心": {screen: user_center},
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
            backgroundColor:'#78d3e9'
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