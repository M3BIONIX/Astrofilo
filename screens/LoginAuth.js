import React,{Component} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { GoogleSignin } from '@react-native-google-signin/google-signin';




export default class LoginAuth extends Component {
   
    componentDidMount(){
        GoogleSignin.configure({
            webClientId : '1030452710792-5rvtrru2v3se9dgjmut0r39r7ijrrm75.apps.googleusercontent.com'
        });


        }
    render() {
        return (
            <View style={styles.layer} >
                <View style = {styles.log}>
                    <TouchableOpacity style={styles.Cbutton}>
                       <Text style={{color : '#FFFFFF', fontFamily: 'font', fontSize : 15}}>Create Account</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', alignItems: 'center',marginTop : 55, position : 'absolute'}}>
                        <View style={{flex: 1, height: 0.7, backgroundColor: '#808080'}} />
                        <View>
                            <Text style={{width: 50, textAlign: 'center', fontFamily : 'font', fontSize : 13}}>or</Text>
                         </View>
                        <View style={{flex: 1, height: 0.7, width : 100, backgroundColor: '#808080'}} />
                    </View>
                    <TouchableOpacity style={styles.Gbutton}>
                       <Image source={require('../assets/Glogo.png')} style={{height : 20, width : 20, marginHorizontal : 10}}/>
                       <Text style={{color : '#000000', fontFamily: 'font', fontSize : 16}}>Continue with Google</Text>
                    </TouchableOpacity>
                    <View style={{height : 40, width : 300, justifyContent : 'center',marginTop : 150 , fontSize :11, position : "absolute" }}>
                     <Text style={{fontFamily :'fontl', justifyContent :'center'}}>
                      By signing up, you agree to our 
                      <Text style={{color:"#000000"}}> Terms of Service </Text> 
                      and 
                      <Text style={{color:"#000000"}}> Privacy Policy</Text>
                     </Text>
                    </View>
                </View>
                
            </View>
        );
    }

}

const styles = StyleSheet.create({
   
    layer :{
        flex : 3,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : 'white',
        
    },
   
    log : {
        flex : 2,
        height : 50,
        width : 200, 
        justifyContent : 'space-between',
        alignItems : 'center',
        marginTop : 550,
        flexDirection : 'column'
    },

    Gbutton :{
        flex: 1,
        height : 50,
        width : 300,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius: 50,
        borderColor : '#808080',
        overflow : 'hidden',
        borderWidth : 1,
        position : 'absolute',
        flexDirection : 'row',
        
        
    },

    Cbutton : {
        
        height : 50,
        width : 300,
        backgroundColor : '#000000',
        borderRadius : 50,
        alignItems : 'center',
        justifyContent : 'center',
        marginTop : 80,
        
    },
   
})


