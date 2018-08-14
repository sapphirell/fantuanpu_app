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
    Image,
    ImageBackground,
    AsyncStorage,//持久化存储
    FlatList, Dimensions

} from 'react-native';
import root from '../model/root'
import SmartView from "../model/SmartView";
import Notice from "../model/Notice";
let {height, width} = Dimensions.get('window');
export default class message extends Component  {
    async componentDidMount() {
        let token = await AsyncStorage.getItem('user_token');
        let formData = "token=" + token;
        let postUrl = global.webServer + "app/get_notice" ;

        fetch(postUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData
        })
        // .then((response) => console.log(response))
            .then((response) => response.json())
            .then((responseJson)=>{
                if (responseJson.ret === 200)
                {
                    this.setState({user_notice:responseJson.data})
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    dump_note = (note) => {
        note = note.replace(/\<a.*?\>|\<\/a\>|查看|&nbsp;|\s/g,'');
        // console.log(note)
        return note;
    };
    state = {
        user_notice : [],

    };

    render() {
        const { navigate } = this.props.navigation;
        // console.log(this.state.forum_data)
        return (
            <SmartView style={{width:width,height:height}}>
                <View style={{height:50,backgroundColor:"#ee7489",flexDirection:"row",paddingTop:20}}>
                    <Text style={{color:"#FFF",width:width,textAlign:"center",fontSize:16}}>消息</Text>
                </View>
                <FlatList
                    data={this.state.user_notice}
                    style={{zIndex:1, borderTopWidth:1,borderColor:"#f4f4f4",paddingTop:5,marginTop:5 }}
                    keyExtractor = {  (item) => item.note }
                    renderItem= {
                        ({item}) => {
                            return (
                                <TouchableOpacity style={{
                                                    flexDirection:"row",
                                                    marginBottom:15,
                                                    width:width-10,
                                                    minHeight:50,
                                                    padding:10,
                                                    borderBottomWidth:0.5,
                                                    borderColor:"#d8c9cd",
                                                    backgroundColor:"#fff",
                                                    margin:5}}
                                                  onPress={() => navigate('read_message',{
                                                      message: item,
                                                      callback : () => {  }
                                                  })}
                                >
                                    <Image
                                        style={{width:25,height:25,marginRight:10}}
                                        source={source=require('../../image/reply-w.png')} />
                                    <Text style={{color:"#646464",width:(width-10) * 0.8}} numberOfLines={1}>{this.dump_note(item.note)}</Text>
                                    <Image
                                        style={{width:15,height:15,}}
                                        source={source=require('../../image/left.png')} />
                                </TouchableOpacity>
                            )
                        }
                    }
                />
            </SmartView>
        );
    }
}

const styles = StyleSheet.create({
    loginButton : {

    },

});
