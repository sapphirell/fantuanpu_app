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
    FlatList,
    Image, Dimensions

} from 'react-native';
import root from '../model/root'
let {height, width} = Dimensions.get('window');

type Props = {};
const Block = () => {

};
const BottomForum = (bottomData) => {
    return (
        <FlatList
            data={bottomData.bottom}
            keyExtractor = { _keyExtractor }
            style={{ flexDirection:'row',width:width,padding:5}}
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
    );
};
const _keyExtractor = (item) =>  item.name ;
export default class forum extends Component  {
    async componentDidMount() {
        if (!this.state.forum_data.data)
        {
            let forum_list = await AsyncStorage.getItem('forum_list');
            if (forum_list)
            {
                this.setState({forum_data : forum_list});
            }
            else
            {
                let dataUrl = global.webServer + 'app/forum_list';
                let data = await fetch(dataUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: ""
                }).then((response)=> {return response.json()});
                if (data.ret != 200)
                    alert(data.msg);
                else
                    this.setState({forum_data : data.data});
            }
        }
    }

    state = {
        forum_data : {}
    };

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={{paddingTop:20}}>
                <FlatList data={this.state.forum_data}
                          keyExtractor = {_keyExtractor}
                          style={{flexDirection:"row"}}
                          // numColumns={10}
                          renderItem= {
                              ({item}) => {
                                  return (
                                        <View style={{}}>
                                            <Text style={{}}>{item.name}</Text>
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
