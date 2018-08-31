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
    Dimensions,
    Platform
} from 'react-native';


let {height, width} = Dimensions.get('window');
import ImagePicker from "react-native-image-picker";
export default class test extends Component {
    state = {
        is_login : false,
        user_center_data : {},
        user_token : false,
        login_status : false,//子组件登录状态通知
        show_notice :false,
        notice_fn : false,

    };

    componentDidMount() {

    }
    uploadImage = (params) =>{
        let formData = new FormData();
        return new Promise(function (resolve, reject) {
            let formData = new FormData();
            let file = {uri: params.path, type: 'multipart/form-data', name: 'image.jpg'};
            alert('uploading')
            formData.append("image", file);
            // console.log(JSON.stringify(formData))
            fetch('https://image.fantuanpu.com/upload_file', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data;charset=utf-8',
                },
                body: formData,
            }).then((response) => response.json())
                .then((responseData)=> {
                    console.log('uploadImage', responseData);
                    resolve(responseData);
                })
                .catch((err)=> {
                    console.log('err', err);
                    reject(err);
                });
        });
    };
    pickImage = () => {
        const options = {
            title:'请选择',
            cancelButtonTitle:'取消',
            takePhotoButtonTitle:'拍照',
            chooseFromLibraryButtonTitle:'选择相册',
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled video picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let params = {
                    path:response.uri    //本地文件地址
                };
                // this.props.update_upload_status('uploading...');


                console.log(response.uri )
                let formData = new FormData();
                let file = {uri: params.path, type: 'multipart/form-data', name: 'image.jpg'};
                formData.append("image", file);
                // console.log(JSON.stringify(formData))
                fetch('https://image.fantuanpu.com/upload_file', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data;charset=utf-8',
                    },
                    body: formData,
                }).then((response) => response.json())
                    .then((responseData)=> {
                        console.log('uploadImage', responseData);
                        resolve(responseData);
                    })
                    .catch((err)=> {
                        console.log('err', err);
                        reject(err);
                    });
                // this.uploadImage(params )
                //     .then( res=>{
                //         // this.props.update_upload_status('success',"https://image.fantuanpu.com/"+res.data.url);
                //         console.log(res)
                //     }).catch( err=>{
                //     //请求失败
                // })

            }
        });
    };
    render() {
        const {state , goBack ,navigate} = this.props.navigation;

        // console.log(state.params);
        // console.log(this.state.user_center_data.user_info);
        return (
            <View style={{paddingTop:100}}>
                <TouchableOpacity onPress={
                    ()=>{
                        let formData = new FormData();
                        let file = {uri: 123, type: 'multipart/form-data', name: 'image.jpg'};
                        formData.append("image", file);
                        console.log(formData)
                    }
                }>
                    <Text>test</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#eee',
    },

});
