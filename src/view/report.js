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
export default class report extends Component  {
    async componentDidMount() {

    }

    state = {
        forum_data : {},
        upload_status:"free",
        content:'',
        title:"",
        type:"",
        forum_list:['功能完善意见','功能bug反馈','其它'],
        show_notice: false,
        notice_fn:false,
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

    postThread = async (goBack) => {
        if (this.state.content === "")
        {
            // alert ('必须输入帖子内容');
            this.setState({show_notice:'必须输入标题', notice_fn:()=>{
                    this.setState({show_notice:false,notice_fn:false});
                }});
            return false;
        }
        if (this.state.title === "")
        {
            this.setState({show_notice:'必须输入内容', notice_fn:()=>{
                    this.setState({show_notice:false,notice_fn:false});
                }});
            return false;
        }
        if (this.state.type === "")
        {
            this.setState({show_notice:'必须选择类型', notice_fn:()=>{
                    this.setState({show_notice:false,notice_fn:false});
                }});
            return false;
        }
        let token = await AsyncStorage.getItem('user_token');
        let formData = 'content=' + this.state.content + '&title=' + this.state.title + "&token=" + token + "&type=" . this.state.type;
        // console.log(loginUrl);
        // console.log(formData);
        let postUrl = global.webServer + "app/user_report" ;
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
                console.log(responseJson)
                if (responseJson.ret === 200)
                {
                    this.setState({show_notice:'发帖成功!~', notice_fn:()=>{
                            this.setState({show_notice:false,notice_fn:false});
                            goBack();
                        }});
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
    _textAreaOnChange = (data) => {
        this.setState({content:data});
    };
    _textInputOnChange = (data) => {this.setState({title : data})};
    render() {
        const { navigate ,goBack} = this.props.navigation;
        // console.log(this.state.forum_data)
        return (
            <SmartView style={{width:width,height:height,backgroundColor:"#fff"}}>
                { this.state.show_notice && <Notice message={this.state.show_notice} fn={this.state.notice_fn} />}
                <View
                    style={{
                        width:width,
                        backgroundColor:"#ee7489",
                        paddingBottom:8,
                        paddingTop:18,
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
                        意见反馈
                    </Text>
                    <TouchableOpacity style={{}} onPress={()=>this.postThread(goBack)} >
                        <Text style={{fontSize:13,color:"#f5f5f5"}}>提交</Text>
                    </TouchableOpacity>
                </View>
                <View style={{top:0,width:width,
                    backgroundColor:this.state.upload_status == 'free' ? "#fff":
                        (this.state.upload_status == "success" ? "#a0cc72" : "#ee7489")
                }}>
                    <Text style={{fontSize:11, color:"#fff",textAlign:"center"}}>{this.state.upload_status}</Text>
                </View>
                <View style={{width:width,flexDirection:"row"}}>
                    <ModalDropdown
                        style={{width:100,paddingTop:15, paddingLeft:10}}
                        dropdownStyle={{
                            marginTop:10,
                            width:100,
                            shadowOffset:{height:1},
                            shadowRadius:2,
                            shadowColor:'grey',
                        }}
                        options={this.state.forum_list}
                        onSelect={(index, value)=>{
                            this.setState({fname: value})
                        }}
                        defaultValue="反馈类型"
                    />
                    <TextInput
                        style={styles.TextInput}
                        autoCapitalize = "none"
                        autoCorrect={false}
                        onChangeText={this._textInputOnChange}//输入框改变触发的函数
                        // onChangeText={(text) => this.setState({email:text})}
                    />
                </View>

                <ScrollView>
                    <TextInput
                        style={styles.TextArea}
                        autoCapitalize = "none"
                        autoCorrect={false}
                        multiline={true}
                        value={this.state.content}
                        onChangeText={this._textAreaOnChange}//输入框改变触发的函数
                        // numberOfLines={true}
                        // onChangeText={(text) => this.setState({email:text})}
                    />

                </ScrollView>
                <KeyboardAvoidingView
                    // style={{position:"relative",zIndex:99,bottom:30,}}
                    style={styles.floatBar}  behavior="padding" keyboardVerticalOffset={50} >
                    <UploadImage style={{alignItems:"flex-start"}} update_upload_status={this.update_upload_status} />

                </KeyboardAvoidingView>
            </SmartView>
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
        fontSize:16,
        width:width-100
    },
    TextArea : {
        paddingLeft:20,
        paddingRight:20,
        paddingTop:15,
        paddingBottom:15,
        borderTopWidth:1,
        textAlignVertical: "top",//安卓取消上下居中
        borderBottomWidth:1,
        borderColor:"#eee",
        marginBottom:10,
        fontSize:16,
        height:height-200,
        lineHeight:15
    }
});
