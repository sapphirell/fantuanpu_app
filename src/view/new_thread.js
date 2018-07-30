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
    FlatList, Dimensions,ScrollView

} from 'react-native';
import root from '../model/root'
import UploadImage from '../model/upload_image'
let {height, width} = Dimensions.get('window');
export default class message extends Component  {
    async componentDidMount() {

    }

    state = {
        forum_data : {},
        upload_status:"free",
        content:''
    };
    update_upload_status = (status,url) => {
        if (url)
        {
            this.setState({upload_status:status,content:this.state.content+"[img]"+url+"[/img]"});
        }
        else
        {
            this.setState({upload_status:status});
        }

    };
    _onChangeText = (data) => {
        this.setState({content:data});
    };
    render() {
        const { navigate ,goBack} = this.props.navigation;
        // console.log(this.state.forum_data)
        return (
            <View style={{width:width,height:height,backgroundColor:"#fff"}}>
                <View
                    style={{
                        width:width,
                        backgroundColor:"#ee7489",
                        paddingBottom:8,
                        paddingTop:38,
                        // borderBottomWidth:1,
                        // borderColor:"#cccccc",
                        alignItems:"center",
                        flexDirection:"row",
                        flexWrap:"wrap"
                    }}
                >
                    <TouchableOpacity
                        onPress={()=>goBack()}
                        style={{
                            // textAlign: "left",
                            flexDirection:"row",
                            width:70,
                            // marginRight:width-130
                        }}>
                        <Image
                            source={source=require('../../image/arrow-left.png')}
                            style={{width: 14, height: 14,borderRadius:5, marginLeft:10}} />

                        <Text
                            style={{fontSize:16, paddingBottom:5,color:"#fff"}}
                        >返回</Text>

                    </TouchableOpacity>
                    <Text style={{width:width-130,textAlign:"center",fontWeight:"700",color:"#fff",fontSize:16,position:"relative",bottom:2}}>
                        发表主题
                    </Text>
                    <TouchableOpacity style={{position:"absolute", right:10, top:40,}}>
                        <Text style={{fontSize:13,color:"#f5f5f5"}}>发射！</Text>
                    </TouchableOpacity>
                </View>
                <View style={{top:0,width:width,
                    backgroundColor:this.state.upload_status == 'free' ? "#fff":
                        (this.state.upload_status == "success" ? "#a0cc72" : "#ee7489")
                }}>
                    <Text style={{fontSize:11, color:"#fff",textAlign:"center"}}>{this.state.upload_status}</Text>
                </View>
                <TextInput
                    style={styles.TextInput}
                    autoCapitalize = "none"
                    autoCorrect={false}
                    // onChangeText={(text) => this.setState({email:text})}
                />
                <ScrollView>
                    <TextInput
                        style={styles.TextArea}
                        autoCapitalize = "none"
                        autoCorrect={false}
                        multiline={true}
                        value={this.state.content}
                        onChangeText={this._onChangeText}//输入框改变触发的函数
                        // numberOfLines={true}
                        // onChangeText={(text) => this.setState({email:text})}
                    />

                </ScrollView>
                <View style={{position:"relative",zIndex:99,bottom:30,}}>
                    <UploadImage update_upload_status={this.update_upload_status} />

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loginButton : {

    },
    TextInput : {
        paddingLeft:20,
        paddingRight:20,
        paddingTop:15,
        paddingBottom:15,
        borderBottomWidth:1,
        borderBottomColor:"#eee",
        fontSize:16
    },
    TextArea : {
        paddingLeft:20,
        paddingRight:20,
        paddingTop:15,
        paddingBottom:15,
        borderBottomWidth:1,
        borderBottomColor:"#eee",
        marginBottom:10,
        fontSize:16,
        height:height-200
    }
});
