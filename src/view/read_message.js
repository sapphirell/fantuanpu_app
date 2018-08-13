import React, { Component } from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    YellowBox,
    Button,
    ImageBackground,
    AsyncStorage,//持久化存储
    FlatList, Dimensions,ScrollView,
    KeyboardAvoidingView

} from 'react-native';
import root from '../model/root'
import ModalDropdown from 'react-native-modal-dropdown';
import UploadImage from '../model/upload_image'
import SmartView from '../model/SmartView'
import Notice from '../model/Notice'
let {height, width} = Dimensions.get('window');
export default class message extends Component  {
    async componentDidMount() {
        await this.setState({message:this.props.navigation.state.params.message});
        console.log(this.props.navigation.state.params.message)
    }

    state = {
        show_notice: false,
        notice_fn:false,
        message:false
    };


    _textInputOnChange = (data) => {this.setState({title : data})};
    render() {
        const { navigate ,goBack} = this.props.navigation;
        // console.log(this.state.forum_data)
        return (
            <SmartView style={{width:width,height:height,backgroundColor:"#fff"}}>
                <View
                    style={{
                        width:width,
                        // paddingBottom:8,
                        paddingTop:18,
                        height:50,
                        flexDirection:"row",
                        flexWrap:"wrap",
                        backgroundColor:"#ee7489"
                    }}
                >
                    <TouchableOpacity
                        onPress={()=>goBack()}
                        style={{
                            // textAlign: "left",
                            flexDirection:"row",
                            width:70,
                            marginRight:width-180,
                            // marginTop:10
                        }}>
                        <Image
                            source={source=require('../../image/arrow-left.png')}
                            style={{width: 14, height: 14,borderRadius:5, marginLeft:10}} />

                        <Text
                            style={{fontSize:16, paddingBottom:5,color:"#fff"}}
                        >返回</Text>

                    </TouchableOpacity>


                </View>
                {this.state.show_notice && <Notice message={this.state.show_notice} fn={this.state.notice_fn} />}
                {this.state.message ?

                    <View style={{width:width*0.9, marginLeft:width*0.05}}>
                        {this.state.message.poster_avatar &&
                            <Image source={{uri: this.state.message.poster_avatar}} style={{width: 80, height: 80,borderRadius:40,}} />
                        }
                        <Text style={{padding:10, fontSize:16,marginBottom:20,marginTop:20,
                            // color:"#707070",
                            // textShadowOffset:{height:1},
                            // textShadowRadius:2,
                            // textShadowColor:'grey',
                        }}>{this.state.message.note}</Text>
                        <Text>{this.state.message.date}</Text>
                        {
                            this.state.message.type === 'post' &&
                            <TouchableOpacity
                                onPress={
                                    () => {
                                        navigate('thread_view',{
                                            tid: this.state.message.from_id,
                                            // callback : () => { this.getUserCenterData(); }
                                        })
                                    }}
                                style={{backgroundColor:"#99e7ff",padding:15,alignItems:"center",
                                // borderWidth:2,borderColor:"#2b4b7a"
                            }}>
                                <Text style={{color:"#ffffff",fontSize:16,textAlign:"center",fontWeight:"900",width:100,
                                    }}>查看</Text>
                            </TouchableOpacity>
                        }

                    </View>
                    :
                    <View/>
                }
            </SmartView>
        );
    }
}

const styles = StyleSheet.create({
    loginButton : {

    },

});
