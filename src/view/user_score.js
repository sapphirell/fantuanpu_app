/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    navigate,
    ImageBackground,
    ScrollView,
    AsyncStorage,
    Image, YellowBox,
    Dimensions
} from 'react-native';
import Login from './login'
import UserCenterButton from '../model/UserCenterButton';
import SmartView from '../model/SmartView';
import Notice from '../model/Notice';
type Props = {};
YellowBox.ignoreWarnings(['M']);
let {height, width} = Dimensions.get('window');
export default class user_score extends Component {
    state = {
        show_notice :false,
        notice_fn : false,
        user:false,
        selected:1,
    };

    async componentDidMount () {
        await this.setState({
            user:this.props.navigation.state.params.score
        });
        console.log(this.props.navigation.state.params.score)
        console.log(this.state.user.user_info.username)
    }

    render() {
        const {state , goBack ,navigate} = this.props.navigation;

        // console.log(state.params);
        // console.log(this.state.user_center_data.user_info);
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
                    {
                        this.state.user &&
                        <View>
                            <Text style={{width:width-130,textAlign:"center",fontWeight:"700",color:"#fff",fontSize:14,position:"relative",bottom:2}}>
                                {this.state.user.user_info.username}
                            </Text>
                        </View>
                    }

                </View>
                <View style={{backgroundColor:"#3cccc1",borderWidth:1,borderColor:"#04ccc4", borderRadius:8,flexDirection:"row",width:122,marginLeft:(width-121)/2,marginTop:15,overflow:"hidden"}}>
                    <TouchableOpacity
                        onPress={()=>{
                            this.setState({selected:1});
                        }}
                        style={{width:60,borderRightWidth:1, borderColor:"#fff",backgroundColor:this.state.selected == 1 ? "#3cccc1" : "#FFF",alignItems:"center",paddingTop:5,paddingBottom:5,}}>
                        <Text style={{color:this.state.selected == 1 ? "#fff" : "#3cccc1"}}>积分</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{
                            this.setState({selected:2});
                        }}
                        style={{width:60,alignItems:"center",paddingTop:5,backgroundColor:this.state.selected == 2 ? "#3cccc1" : "#FFF",paddingBottom:5,overflow:"hidden"}}>
                        <Text style={{color:this.state.selected == 1 ? "#3cccc1" : "#FFF"}}>统计</Text>
                    </TouchableOpacity>
                </View>

                {
                    this.state.user ? (
                        this.state.selected === 1 ?

                            <View>
                                <Text style={{width:width,textAlign:"center"}}>
                                    * 下列积分均与充值无关。
                                </Text>
                                <View style={styles.item}>
                                    <Text style={styles.title}>{this.state.user.user_count.extcredits.extcredits2}</Text>
                                    <Text style={styles.content}>
                                        {this.state.user.user_count.extcredits2}
                                    </Text>
                                    <TouchableOpacity style={styles.question} onPress={()=>{
                                        this.setState({show_notice:"扑币由日常活动获取，例如发帖、回帖、签到等。",notice_fn:()=>{this.setState({show_notice:false,notice_fn:false})}})
                                    }}>
                                        <Image source={source=require('../../image/question.png')} style={{width:20,height:20}} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.item}>
                                    <Text style={styles.title}>{this.state.user.user_count.extcredits.extcredits1}</Text>
                                    <Text style={styles.content}>
                                        {this.state.user.user_count.extcredits1}
                                    </Text>
                                    <TouchableOpacity style={styles.question} onPress={()=>{
                                        this.setState({show_notice:"参与特别的活动可以获取酸奶。",notice_fn:()=>{this.setState({show_notice:false,notice_fn:false})}})
                                    }}>
                                        <Image source={source=require('../../image/question.png')} style={{width:20,height:20}} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.item}>
                                    <Text style={styles.title}>{this.state.user.user_count.extcredits.extcredits3}</Text>
                                    <Text style={styles.content}>
                                        {this.state.user.user_count.extcredits3}
                                    </Text>
                                    <TouchableOpacity style={styles.question} onPress={()=>{
                                        this.setState({show_notice:"如果你发表的主题被社区版主判定为精华主题，那您的项链会增加1.",notice_fn:()=>{this.setState({show_notice:false,notice_fn:false})}})
                                    }}>
                                        <Image source={source=require('../../image/question.png')} style={{width:20,height:20}} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.item}>
                                    <Text style={styles.title}>{this.state.user.user_count.extcredits.extcredits4}</Text>
                                    <Text style={styles.content}>
                                        {this.state.user.user_count.extcredits4}
                                    </Text>
                                    <TouchableOpacity style={styles.question} onPress={()=>{
                                        this.setState({show_notice:"每次签到都会获取一定数量的草莓棉花糖，连续签到会提升获取的数量。",notice_fn:()=>{this.setState({show_notice:false,notice_fn:false})}})
                                    }}>
                                        <Image source={source=require('../../image/question.png')} style={{width:20,height:20}} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.item}>
                                    <Text style={styles.title}>{this.state.user.user_count.extcredits.extcredits5}</Text>
                                    <Text style={styles.content}>
                                        {this.state.user.user_count.extcredits5}
                                    </Text>
                                    <TouchableOpacity style={styles.question} onPress={()=>{
                                        this.setState({show_notice:"在一些特定板块发帖将会获取到灵魂宝石。",notice_fn:()=>{this.setState({show_notice:false,notice_fn:false})}})
                                    }}>
                                        <Image source={source=require('../../image/question.png')} style={{width:20,height:20}} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.item}>
                                    <Text style={styles.title}>{this.state.user.user_count.extcredits.extcredits6}</Text>
                                    <Text style={styles.content}>
                                        {this.state.user.user_count.extcredits6}
                                    </Text>
                                    <TouchableOpacity style={styles.question} onPress={()=>{
                                        this.setState({show_notice:"在一些特定板块发帖将会获取到文点。",notice_fn:()=>{this.setState({show_notice:false,notice_fn:false})}})
                                    }}>
                                        <Image source={source=require('../../image/question.png')} style={{width:20,height:20}} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.item}>
                                    <Text style={styles.title}>{this.state.user.user_count.extcredits.extcredits7}</Text>
                                    <Text style={styles.content}>
                                        {this.state.user.user_count.extcredits7}
                                    </Text>
                                    <TouchableOpacity style={styles.question} onPress={()=>{
                                        this.setState({show_notice:"在一些特定板块发帖将会获取到分享积分。",notice_fn:()=>{this.setState({show_notice:false,notice_fn:false})}})
                                    }}>
                                        <Image source={source=require('../../image/question.png')} style={{width:20,height:20}} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.item}>
                                    <Text style={styles.title}>{this.state.user.user_count.extcredits.extcredits8}</Text>
                                    <Text style={styles.content}>
                                        {this.state.user.user_count.extcredits8}
                                    </Text>
                                    <TouchableOpacity style={styles.question} onPress={()=>{
                                        this.setState({show_notice:"在一些特定板块发帖将会获取到图点。",notice_fn:()=>{this.setState({show_notice:false,notice_fn:false})}})
                                    }}>
                                        <Image source={source=require('../../image/question.png')} style={{width:20,height:20}} />
                                    </TouchableOpacity>
                                </View>

                            </View>
                            :
                            <View>
                                <View style={styles.item}>
                                    <Text style={styles.title}>好友数量</Text>
                                    <Text style={styles.content}>
                                        {this.state.user.user_count.friends}
                                    </Text>
                                    <View style={styles.question}/>
                                </View>
                                <View style={styles.item}>
                                    <Text style={styles.title}>主题数量</Text>
                                    <Text style={styles.content}>
                                        {this.state.user.user_count.threads}
                                    </Text>
                                    <View style={styles.question}/>
                                </View>
                                <View style={styles.item}>
                                    <Text style={styles.title}>回帖数量</Text>
                                    <Text style={styles.content}>
                                        {this.state.user.user_count.posts}
                                    </Text>
                                    <View style={styles.question}/>
                                </View>
                                <View style={styles.item}>
                                    <Text style={styles.title}>在线时间</Text>
                                    <Text style={styles.content}>
                                        {this.state.user.user_count.oltime} (h)
                                    </Text>
                                    <View style={styles.question}/>
                                </View>
                            </View>
                    ) : <View/>


                }

            </SmartView>
        );
    }
}

const styles = StyleSheet.create({
    item : {
        flexDirection:"row",

        width:width,
        margin:10,
        padding:10,
    },
    title : {flex:45,fontSize:15,color:"#3cccc1",textAlign:"right"},
    content: {flex:30,flexDirection:"row",textAlign:"right"},
    question: {flex:60,paddingLeft:15}
});
