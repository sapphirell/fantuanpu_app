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
    TextInput,
    YellowBox,
    Button,
    ImageBackground,
    AsyncStorage,//持久化存储
    FlatList

} from 'react-native';
import root from '../model/root'


type Props = {};
const Block = () => {

};
const BottomForum = (bottomData) => {
    return (
        <FlatList
            data={bottomData.bottom}
            keyExtractor = { _keyExtractor }
            renderItem= {
                ({item}) => {
                    return (
                        <View style={{paddingLeft:20}}>
                            <Text>{item.name}</Text>
                        </View>
                    )
                }
            }
        />
    );
};
const _keyExtractor = (item, index) => {
    // console.log(item)
    return item.name +Math.random();
};
export default class forum extends Component  {
    async componentDidMount() {
        if (!this.state.forum_data.data)
        {
            let forum_list = await AsyncStorage.getItem('forum_list');
            if (forum_list && 1==2)
            {

                this.setState({forum_data : forum_list});
            }
            else
            {
                let dataUrl = global.webServer + 'app/forum_list';
                // let formData = 'email='+this.state.email+'&password='+this.state.password+'&form=app';
                let data = await fetch(dataUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: ""
                }).then((response)=> {return response.json()});

                if (data.ret != 200)
                {
                    alert(data.msg);
                }
                else
                {
                    this.setState({forum_data : data.data});
                }
            }
        }
    }

    state = {
        forum_data : {}
    };

    render() {
        const { navigate } = this.props.navigation;
        // console.log(this.state.forum_data)
        return (
            <View style={{paddingTop:20}}>
                <FlatList data={this.state.forum_data}
                          keyExtractor = {_keyExtractor}
                          renderItem= {
                              ({item}) => {
                                  return (
                                        <View>
                                            <Text>{item.name}</Text>
                                            <BottomForum bottom={item.bottomforum} />
                                        </View>
                                  )
                              }
                          }

                >

                </FlatList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loginButton : {

    },

});
