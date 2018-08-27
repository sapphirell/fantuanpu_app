import React, { Component } from 'react';
import {
    StyleSheet,
    AsyncStorage,//持久化存储
    Image,
    TouchableOpacity,
    View,
    Text,
    Dimensions,

} from 'react-native';

// import FormData from "form-data"
import ImagePicker from "react-native-image-picker";
let {height, width} = Dimensions.get('window');
export default class upload_image extends Component  {
    state = {
        upload_status :"free"
    };
    async componentDidMount() {
    }
    uploadImage = (params) =>{
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
                this.props.update_upload_status('uploading...');


                console.log(response.uri )

                this.uploadImage(params )
                    .then( res=>{
                        this.props.update_upload_status('success',"https://image.fantuanpu.com/"+res.data.url);
                        console.log(res)
                    }).catch( err=>{
                    //请求失败
                })

            }
        });
    };
    render() {
        return (
            <View style={{alignItems:this.props.style.alignItems ?this.props.style.alignItems : "center"}} >

                <TouchableOpacity onPress={this.pickImage}
                                  style={{
                                      alignItems:"center",
                                      paddingTop: this.props.style.paddingTop ? this.props.style.paddingTop : 0
                                  }} >
                    <Image   source={source=require('../../image/upload-image.png')}
                             style={{width: this.props.style.width?this.props.style.width:30, height: this.props.style.height ?this.props.style.height:30,  marginLeft:10}} />

                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    statusBar : {
        // position:"absolute",
        top:0,width:width,backgroundColor:"#ff6888",color:"#fff"
    }

});
