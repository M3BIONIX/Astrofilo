import  React,{Component} from "react";
import {View, StyleSheet} from 'react-native';
import ModelView from 'react-native-gl-model-view';

export default class Test extends Component{

  render(){
    return(
       <View style={styles.layer}>
           <ModelView 
              model = {require('../assets/Model/earth.obj')} 
              texture = {require('../assets/Textures/Diffuse_2K.png')} 
              scale = {0.01} 
              translateZ = {-2 }  
              rotateZ = {270} 
              style = {{flex: 1}}
           />
        </View>
   
    )

  }
}

const styles = StyleSheet.create({
  layer :{
    flex : 1,
     justifyContent : 'center',
     alignItems : 'center',
     backgroundColor : 'white',
    },
})