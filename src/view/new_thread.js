//
// import React from 'react';
// import {
//     AppRegistry,
//     StyleSheet,
//     Text,
//     View,
//     PixelRatio,
//     TouchableOpacity,
//     Image,
// } from 'react-native';
//
// import ImagePicker from 'react-native-image-picker';
//
// export default class App extends React.Component {
//
//     state = {
//         avatarSource: null,
//         videoSource: null
//     };
//
//     selectPhotoTapped() {
//         const options = {
//             title:'请选择',
//             cancelButtonTitle:'取消',
//             takePhotoButtonTitle:'拍照',
//             chooseFromLibraryButtonTitle:'选择相册',
//             quality: 1.0,
//             maxWidth: 500,
//             maxHeight: 500,
//             storageOptions: {
//                 skipBackup: true
//             }
//         };
//
//         ImagePicker.showImagePicker(options, (response) => {
//             console.log('Response = ', response);
//
//             if (response.didCancel) {
//                 console.log('User cancelled photo picker');
//             }
//             else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             }
//             else if (response.customButton) {
//                 console.log('User tapped custom button: ', response.customButton);
//             }
//             else {
//                 let source = { uri: response.uri };
//
//                 // You can also display the image using data:
//                 // let source = { uri: 'data:image/jpeg;base64,' + response.data };
//
//                 this.setState({
//                     avatarSource: source
//                 });
//             }
//         });
//     }
//
//     selectVideoTapped() {
//         const options = {
//             title: 'Video Picker',
//             takePhotoButtonTitle: 'Take Video...',
//             mediaType: 'video',
//             videoQuality: 'medium'
//         };
//
//         ImagePicker.showImagePicker(options, (response) => {
//             console.log('Response = ', response);
//
//             if (response.didCancel) {
//                 console.log('User cancelled video picker');
//             }
//             else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             }
//             else if (response.customButton) {
//                 console.log('User tapped custom button: ', response.customButton);
//             }
//             else {
//                 this.setState({
//                     videoSource: response.uri
//                 });
//             }
//         });
//     }
//
//     render() {
//         return (
//             <View style={styles.container}>
//                 <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
//                     <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
//                         { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
//                             <Image style={styles.avatar} source={this.state.avatarSource} />
//                         }
//                     </View>
//                 </TouchableOpacity>
//
//                 <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
//                     <View style={[styles.avatar, styles.avatarContainer]}>
//                         <Text>Select a Video</Text>
//                     </View>
//                 </TouchableOpacity>
//
//                 { this.state.videoSource &&
//                 <Text style={{margin: 8, textAlign: 'center'}}>{this.state.videoSource}</Text>
//                 }
//             </View>
//         );
//     }
//
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF'
//     },
//     avatarContainer: {
//         borderColor: '#9B9B9B',
//         borderWidth: 1 / PixelRatio.get(),
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     avatar: {
//         borderRadius: 75,
//         width: 150,
//         height: 150
//     }
// });
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
// import '../model/root' ;
import React, { Component } from 'react';
import ImagePickerfrom from 'react-native-image-picker';

import ImagePickerManager from 'NativeModules';
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
let {height, width} = Dimensions.get('window');
export default class message extends Component  {
    async componentDidMount() {

    }

    state = {
        forum_data : {}
    };
    pickImage = () => {
        const options = {
            title: 'Select Avatar', // 选择器的标题，可以设置为空来不显示标题
            cancelButtonTitle: 'Cancel',
            takePhotoButtonTitle: 'Take Photo...', // 调取摄像头的按钮，可以设置为空使用户不可选择拍照
            chooseFromLibraryButtonTitle: 'Choose from Library...', // 调取相册的按钮，可以设置为空使用户不可选择相册照片
            customButtons: {
                'Choose Photo from Facebook': 'fb', // [按钮文字] : [当选择这个按钮时返回的字符串]
            },
            mediaType: 'photo', // 'photo' or 'video'
            videoQuality: 'high', // 'low', 'medium', or 'high'
            durationLimit: 10, // video recording max time in seconds
            maxWidth: 100, // photos only默认为手机屏幕的宽，高与宽一样，为正方形照片
            maxHeight: 100, // photos only
            allowsEditing: false, // 当用户选择过照片之后是否允许再次编辑图片
        };

        ImagePickerManager.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePickerManager Error: ', response.error);
            }
            else if (response.customButton) {
                // 这是当用户选择customButtons自定义的按钮时，才执行
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // You can display the image using either data:
            }
        })
    };
    render() {
        const { navigate } = this.props.navigation;
        // console.log(this.state.forum_data)
        return (
            <View style={{width:width,height:height,backgroundColor:"#fff"}}>
                <View
                    style={{
                        width:width,
                        backgroundColor:"#f5f5f5",
                        paddingBottom:8,
                        paddingTop:38,
                        borderBottomWidth:1,
                        borderColor:"#cccccc",
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
                            style={{fontSize:16, paddingBottom:5,color:"#2d2d2d"}}
                        >返回</Text>

                    </TouchableOpacity>
                    <Text style={{width:width-130,textAlign:"center",fontWeight:"700"}}>
                        发表主题
                    </Text>
                    <TouchableOpacity style={{position:"absolute", right:10, top:40,fontSize:13,fontColor:"#841584"}}>
                        <Text style={{fontSize:13,color:"#844b61"}}>发射！</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={styles.TextInput}
                    autoCapitalize = "none"
                    autoCorrect={false}
                    // onChangeText={(text) => this.setState({email:text})}
                />
                <ScrollView>
                    <TouchableOpacity onPress={this.pickImage}>
                        <Text>挑选</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.TextArea}
                        autoCapitalize = "none"
                        autoCorrect={false}
                        multiline={3}
                        numberOfLines={true}
                        // onChangeText={(text) => this.setState({email:text})}
                    />
                </ScrollView>

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
        fontSize:16,
        height:height-300
    }
});
