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
    Dimensions,
    FlatList
} from 'react-native';
import Login from './login'
import UserCenterButton from '../model/UserCenterButton';
import Notice from '../model/Notice';
import SmartView from "../model/SmartView";
type Props = {};
YellowBox.ignoreWarnings(['M']);
let {height, width} = Dimensions.get('window');
export default class user_center extends Component {
    state = {
        show_notice :false,
        notice_fn : false,
        letter : []
    };

    async componentDidMount () {
        await  this.setState({letter:this.props.navigation.state.params.letter});
        // console.log(this.props.navigation.state.params)
    }
    render() {
        const {state , goBack ,navigate} = this.props.navigation;


        // console.log(this.state.user_center_data.user_info);
        return (
            <SmartView>
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
                            source={source=require('../../image/left-w.png')}
                            style={{width: 14, height: 14,borderRadius:5, marginLeft:10}} />


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
                {
                    this.state.letter ?
                        <FlatList
                            data={this.state.letter}
                            extraData={this.state.show_panel}
                            keyExtractor = {  (item) => item.plid}
                            style={{padding:5,marginBottom:90, minHeight:50, height:height-100}}
                            // numColumns={5}
                            // showsHorizontalScrollIndicator= {false}//隐藏水平滚动条
                            showsVerticalScrollIndicator= {false}//隐藏竖直滚动条
                            onEndReached = {this.fetchMore}
                            onEndReachedThreshold = {0.1}

                            onRefresh={this.refreshingData}
                            refreshing={this.state.isRefresh}
                            // horizontal={true} //水平布局
                            renderItem= {({item}) => {
                                return (
                                    <View>
                                        <TouchableOpacity
                                            style={{flexDirection:"row",marginBottom:10,padding:10,}}
                                            onPress={()=>{
                                            navigate('read_letter',{
                                                plid: item.plid,
                                                // callback : () => { this.getUserCenterData(); }
                                            })
                                        }}>
                                            <Image source={{uri: item.avatar}} style={{width: 40, height: 40,borderRadius:20,}} />
                                            <View style={{width:width-80,paddingLeft:10}}>
                                                <Text numberOfLines={1} style={{fontSize:16,color:"#505050",marginBottom:5}}>{item.subject}</Text>
                                                <Text numberOfLines={1}>{item.lastmessage.lastauthor} 最后回复：{item.lastmessage.lastsummary}</Text>

                                            </View>

                                        </TouchableOpacity>
                                    </View>
                                )}}
                        />
                        :
                        <View style={{width:width, padding:15, alignItems:"center",flexDirection:"row"}}>
                            <Image source={source = require('../../image/nomessage.png')} style={{width:18,height:18}} />
                            <Text style={{color:"#4f4f4f" ,fontSize:16}}>暂无私信</Text>
                        </View>

                }

            </SmartView>
        );
    }
}

const styles = StyleSheet.create({

});
