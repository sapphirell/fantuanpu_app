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

let {height, width} = Dimensions.get('window');

export default class WebImage extends Component {

    state = {
        width:width-40,
        height:150,
        // uri:""
        // uri:"https://image.fantuanpu.com/upload/20180806/2358ff69a0af12eb179e4f63044dc603.gif"
        // uri:"https://img.moegirl.org/common/thumb/7/77/%E8%B7%AF%E4%BA%BA%E5%A5%B3%E4%B8%BB%E7%9A%84%E5%85%BB%E6%88%90%E6%96%B9%E6%B3%95_%E8%A7%92%E8%89%B2%E6%AD%8CCD3.jpg/250px-%E8%B7%AF%E4%BA%BA%E5%A5%B3%E4%B8%BB%E7%9A%84%E5%85%BB%E6%88%90%E6%96%B9%E6%B3%95_%E8%A7%92%E8%89%B2%E6%AD%8CCD3.jpg"
    };
    // shouldComponentUpdate(nextProps,nextState){
        // // console.log(nextProps);
        // console.log(nextState.uri == this.state.uri);
        // // return true;
        // console.log(nextProps);
        // console.log( nextState);
        // console.log(this.state)
        // if (nextProps.uri === nextState.uri){
        //
        //     return false
        // }
        // else
        // {
        //     return true;
        // }
    // }

    componentDidMount() {

        uri = this.props.uri;
        // this.setState({uri:this.props.uri})
        // if (uri !== this.state.uri)
        // {
            // alert('两次不相等')
            Image.getSize(uri, (imgWidth, imgHeight) => {
                if (imgWidth > width)
                {
                    imgHeight = imgHeight * width / (imgWidth - 40);
                    imgWidth = width -40;
                }
                this.setState({width:imgWidth, height:imgHeight , uri:uri});
            });
        // }
        // else {
        //     // alert('两次相等')
        // }


    }
    render() {
        return (
            <Image
                source={{
                    uri:  this.state.uri,
                }}
                style={{width:this.state.width,height:this.state.height,zIndex:1 }}
            />
        )
    };
}

const styles = StyleSheet.create({

});
