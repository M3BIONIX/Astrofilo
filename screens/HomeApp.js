import React,{Component} from 'react';
import { View, StyleSheet,Image,Animated, Dimensions} from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Lottie from "lottie-react-native";
import { Card,Button,Text,Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountDown from 'react-native-countdown-component';

const Stack = createNativeStackNavigator()



class Home extends Component {

constructor(props)
{
super(props);
this.state = {launches: [],loading : true};
this.animationProgress = new Animated.Value(0);

}


componentDidMount(){
    
    Animated.timing(this.animationProgress, {
      toValue: 1,
      duration: 4000,
      speed: 1.5,
      useNativeDriver: true
    }).start();

    this.setState({launches : []});
    this.getLaunches();
    
}



getLaunches = async () => {
 
  try {
        
        const res = await fetch('https://ll.thespacedevs.com/2.2.0/launch/upcoming/')
        .then((response) => response.json()) 
        .then(async(launch) => {this.setState({launches : launch.results})})
        .then(() => {this.setState({loading : false})});
        
               
      } catch (error) {
        console.log("Details API Down");
        console.log(error);
        this.props.navigation.navigate('ApiDown');
        
      }
};







render(){

const cardDetails = (id) => {
 
  this.props.navigation.navigate('CardOpen',{id : id,launches : this.state.launches});
}  

const launchList = () =>  {
 
  try{
  
  return this.state.launches.map(function(launch, i){
    return(
      
      <View key={i} style = {{marginTop : 20}}>
      <View style={{flex : 3, marginLeft : 20}}>
    
      <Card style={{ borderRadius : 10, backgroundColor : '#FFFFFF',width : '95%',height : 300}} mode={'elevated'} onPress={()=>{cardDetails(i)}}> 
        <Card.Title title={launch.name} titleStyle={{fontFamily : 'font', fontSize : 15}} titleNumberOfLines={3}/>
        <Card.Cover source={{ uri : launch.image }} style={{width : '90%',marginLeft :15}} />
        <Card.Content>
          <Text variant='bodyMedium' style={{marginTop:8,marginLeft : 5,fontFamily : 'generalsans-medium',color:'#000000',fontSize : 13}}>{launch.status.description} </Text>
        </Card.Content>
      </Card>
    
      </View>
      </View>
    )
  })
}
catch(error){
  console.log("API Down");
  console.log(error);
  
}
};
   return (
        <View style={styles.layer}>
        
         <View style={{flexDirection : 'row',backgroundColor : '#FFFFFF', height : 90, elevation : 10,marginBottom : 10}}>
          <Image source={require('../assets/logoNav.png')} style={styles.logoNav}/>
          <Text style = {styles.HeadText}> ASTRO | FILO </Text>
         </View>
        <View>
        <View style={{flexDirection : 'row',marginBottom : 10}}>
         <Button style={styles.chooseOption1} mode={'elevated'} onPress={()=>{}} textColor={'#454545'}>
          Launches
          </Button>
          <Button style={styles.chooseOption2} mode={'elevated'} onPress={()=>{}}  textColor={'#454545'}>
          News
          </Button>
          </View>
         
       
        
        <ScrollView contentContainerStyle={{flexGrow : 1,paddingBottom : 200}} >
        
        <View style={{flex : 1,paddingBottom : 150}}>
        {this.state.loading ? <Lottie source={require("../assets/logo.json")} progress={this.animationProgress} loop={true} autoPlay={true} 
            style ={styles.logo} /> 
            : null}
        {
         launchList()   
        }
       
        </View>
        </ScrollView>
        </View>
        </View>
       );

}
}

class ApiDown extends Component{
    
    render()
    {
    return(
        <View style={styles.layer}>
            <Image source={require('../assets/Error.jpg')} style={{height : 400, width : 400, marginTop : 100, alignSelf : 'center'}}/>
            <Text style={{fontFamily : 'font', fontSize : 20, alignSelf : 'center', marginTop : 20, color : '#007dfe'}}>Hmm, I Think the API is down</Text>
            <Text style={{fontFamily : 'font-medium', fontSize : 19, alignSelf : 'center', marginTop : 5, color : '#007dfe'}}>Please try again later</Text>
        </View>
    )}
}


class CardOpen extends Home {
    
constructor(props)
{
super(props);
this.state = {rocketDetails: []};
this.launchDetails = this.props.route.params.launches
this.launchId = Number(this.props.route.params.id)
this.currentDate = new Date();
this.launchDate = new Date(this.launchDetails[this.launchId].window_start);
this.secLeft = Math.abs(this.launchDate - this.currentDate)/1000;
}

getRocketDetails = async() => {
    
  try{
    
    const res = await fetch(this.launchDetails[this.launchId].rocket.configuration.url)
    .then((response) => response.json()) 
    .then((rocket) => { this.setState({rocketDetails : rocket}); })   
    
  }
  catch(error)
  {
    console.log("Rocket Api down");
    this.props.navigation.navigate('ApiDown');
  }

}

componentDidMount(){
  this.getRocketDetails();
 
}


  render(){

    
    return(
            <View>
               <View style={{ backgroundColor : '#EAF3F3',width : Dimensions.get("screen").width, height : Dimensions.get("screen").height}} >
                 <View style={{flexWrap : 'wrap', flex : 1}}>
                 <Image source={{ uri : this.launchDetails[this.launchId].image }} style={{flexWrap : 'wrap',height:'100%', width:'100%',overflow : 'hidden',resizeMode:'cover',}} />
                </View>
                <View>
                <Text style={{fontFamily : 'Outfit-Bold', fontSize : 23, marginTop : 20, marginLeft : 20,color : '#000000'}}>{this.launchDetails[this.launchId].name}</Text>
                
                <Card style={{marginTop : 30, backgroundColor : '#FEF1E6'}} mode={'elevated'}>
                  <Card.Title title="CountDown" titleStyle={{fontFamily : 'font', fontSize : 15}} titleNumberOfLines={1}/>
                  <Card.Content>
                  <CountDown until={this.secLeft} size={20} digitStyle={{backgroundColor : '#FFA9A9'}} digitTxtStyle={{color :'#000000'}}/>
                  </Card.Content>
                </Card>
                
                <Card style={{marginTop : 30, backgroundColor : '#DAF1F1'}} mode={'elevated'} >
                <Card.Content>
                <View>
                <View style={{flexDirection : 'row'}}>
                <Text style={{fontFamily : 'font', fontSize : 14, marginLeft : 8, marginTop : 3}}>Status :</Text>
                <Paragraph numberOfLines={3} style={{fontFamily : 'font-medium', fontSize : 14,width :'72%', marginLeft : 5}}>{this.launchDetails[this.launchId].status.description}</Paragraph>
                </View>
                <View style={{flexDirection : 'row',marginTop : 10}}>
                <Text style={{fontFamily : 'font', fontSize : 14, marginLeft : 8, marginTop : 10}}>Rocket Name:</Text>
                <Text style={{fontFamily : 'font-medium', fontSize : 14, marginLeft : 5, marginTop : 10}}>{this.state.rocketDetails.full_name}</Text>
                </View>
                <View style={{flexDirection : 'row',marginTop : 10}}>
                <Text style={{fontFamily : 'font', fontSize : 14, marginLeft : 8, marginTop : 10}}>Description :</Text>
                <Paragraph numberOfLines={100} style={{fontFamily : 'font-medium', fontSize : 14,width :'70%', marginLeft : 5,marginTop : 10,textAlign :'justify'}}>{this.state.rocketDetails.description}</Paragraph>
                </View>
                </View>
                </Card.Content>
                </Card>
             
                </View>
                </View>
         
               
            </View>
        )
    }
}


export default class HomeApp extends React.Component{
  render(){
  return (
    
      <Stack.Navigator initialRouteName="Home" headerMode="none"  screenOptions={{ headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ApiDown" component={ApiDown} />
        <Stack.Screen name="CardOpen" component={CardOpen} />
      </Stack.Navigator>
      
      );
  }
}


const styles = StyleSheet.create({

   layer : {
    flex : 1,
    backgroundColor : '#FFFFFF'

   },

   logoNav : {
    width : 50,
    height : 50,
    marginTop : 20,
    marginLeft : 30
    },
   HeadText :{
    paddingTop : 30,
    paddingLeft : 10,
    fontFamily : 'generalsans-semibold',
    fontSize : 25,
    color : '#000000',
    letterSpacing : -0.5
   },
   launches : {
    flexDirection : 'column',
    marginTop : 20,
    marginLeft : 20,
    

   },
   launchText : {
    fontFamily : 'font',
    color : '#454545',
    fontSize : 18,
    marginTop : 10,
    marginLeft : 10
   },
    chooseOption1 : {
    
      width : 115,
      marginLeft : 20,
      marginTop : 20
    },
    chooseOption2 : {
    
      width : 115,
      marginLeft : 10,
      marginTop : 20
    },
 
    logo :{
      width : 400,
      height : 400,
      justifyContent : 'center',
      alignItems : 'center',
      marginLeft : 30,
      position : 'absolute',
     
    },

    containerStyles : {
      flexDirection : 'row',
      flexWrap : 'wrap',
      flexGrow : 1,
      marginLeft : 40,
      
    },
    cards : {
      elevation : 5, 
      height : 250, 
      borderRadius : 20, 
      backgroundColor : '#ACE7A4', 
      width : '50%',
      marginTop : 20,
    },
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5
    },
    expand : {
    
      width : 100,
      marginRight : 10,
      marginTop : 20
    },
   
  


});