import React,{Component} from 'react';
import { View, StyleSheet,Image,Animated, Dimensions,ScrollView,TouchableOpacity} from "react-native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Card,Text,Paragraph} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountDown from 'react-native-countdown-component';
import LinearGradient from 'react-native-linear-gradient';
import VideoPlayer from 'react-native-video-player';

const Stack = createNativeStackNavigator()
const width = Dimensions.get('window').width;
const SIZE = width * 0.7;
const SPACER = (width - SIZE) / 2;

class Home extends Component {

constructor(props)
{
super(props);
this.state = {
  launches: [],
  imageOfTheDay : [],
  loading : true, 
  };
this.animationProgress = new Animated.Value(0);

}

componentDidMount(){
    
    Animated.timing(this.animationProgress, {
      toValue: 1,
      duration: 4000,
      speed: 1.5,
      useNativeDriver: true
    }).start();
    this.setState({launches : [], imageOfTheDay : []});
    this.getLaunches();
}

getLaunches = async () => {
 
  try {
        const abort = new AbortController(); 
        const res = await fetch('https://ll.thespacedevs.com/2.2.0/launch/upcoming/',{signal : abort.signal})
        .then((response) => response.json()) 
        .then((launch) => {this.setState({launches : launch.results})})
        .then(() => {this.setState({loading : false})})
        .then(async()=>{
          if(this.state.launches != null)
           await AsyncStorage.setItem('@launches',JSON.stringify(this.state.launches))
        });

       
        const res1 = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY',{signal : abort.signal})
        .then((response) => response.json()) 
        .then((image) => {this.setState({imageOfTheDay : image})})
        .then(() => {this.setState({loading : false})})

       
        
       
      } catch (error) {
        console.log("Details API Down");
        console.log(error);
        if(await AsyncStorage.getItem('@launches') != null)
         this.setState({launches : JSON.parse(await AsyncStorage.getItem('@launches'))});
        this.props.navigation.navigate('ApiDown');
        
      }
};

componentWillUnmount (){
  this.setState({launches : []});
  
}

render(){

const cardDetails = (id) => {
  this.props.navigation.navigate('CardOpen',{id : id,launches : this.state.launches});
}  


const BottomBar = () => {

return(
  <View style={styles.BottomBar}>
          <View style={{flexDirection :'column',justifyContent : 'center',width : 70,marginRight : '65%'}}>
            <View style={{backgroundColor : this.state.color ,borderRadius : 100,justifyContent : 'center',alignItems : 'flex-start',height : '75%',width : '120%', flexDirection : 'row'}}>
               <TouchableOpacity style={{justifyContent : 'center',flexDirection : 'row',marginTop : 8}} activeOpacity={1} 
                  onPress={()=>{ 
                    if ( this.state.colorSelect[0] == 0 ) 
                      {
                        this.setState({colorSelect : [1,0,0]}); 
                        this.setState({color : '#ACE7A4'});
                      }}}>
                 <Image source={require('../assets/rocket.png')} style={{height : 20, width : 20}}/>
                 <Text style={{marginTop : 2,fontFamily : 'font', marginLeft : 5}}>Home</Text>
                </TouchableOpacity>
             </View>
          </View>
  </View>
)
}

const todaysImage = () => {
 

  if(String(imageOfTheDay.media_type) == 'video')
    {
      return(
        <View style={{height : "50%",width : width,marginTop : 20}}>
          <VideoPlayer autoplay={true} defaultMuted={true} video={{ uri: imageOfTheDay.url }} videoWidth={width} videoHeight={300} />
         </View>
      )
    }
  else 
    {
       return (
          <View style={{height : "50%",width : width,marginTop : 20}}>
              <Image source={{uri : imageOfTheDay.url}} style={{height : "100%",width : "100%"}}/>
          </View>
        )
    }
}

return (
   
<View style={styles.layer}>
  <Text style= {{fontFamily : 'font', paddingTop : '10%',paddingLeft : 40,fontSize : 28,color : '#242124',letterSpacing : 0.5,textAlign : 'left'}}>ASTRO | FILO</Text>
 
          
  <Text  style = {{fontFamily : 'font', paddingTop : '30%',paddingLeft : 30,fontSize : 20,color : '#242124',letterSpacing : 0.5,textAlign : 'left'}}>Upcoming Launches</Text>
  <ScrollView horizontal snapToInterval={SIZE} 
          contentContainerStyle={{marginTop : 20,marginBottom : '20%',paddingBottom :'45%'}} 
          decelerationRate='fast'
          showsHorizontalScrollIndicator= {false}
          bounces = {false}
          scrollEventThrottle={16}>
         {
          this.state.launches.map((launch,index)=>{
            return(
              <View key={index} style = {{ width : SIZE}}>
               <View style={{ width : '80%', height : undefined,aspectRatio : 1}}>
                <View style={{backgroundColor : 'red', height : '150%', width : '120%',borderRadius : 30,marginLeft :10}}>
                  <Image source={{uri : launch.image}} style={{height : '100%', width : '100%',borderRadius : 30}}/>    
                    <LinearGradient   colors={['#00000000', '#000000']}   style={{height : '50%', width : '100%', position :'absolute',borderRadius : 30,marginTop :180}}>
                      <Paragraph numberOfLines={2} style={{flex : 1,fontFamily : 'font', fontSize : 18, color : '#FFFFFF',marginLeft : 20,marginTop : 100,position :'absolute', width : '50%'}}>{launch.name}</Paragraph>
                    </LinearGradient>
                 </View>
               </View>
              </View>
             )})
         }
  </ScrollView>
       {
          BottomBar()
        }
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
      )
    }

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
this.secLeft = (this.launchDate - this.currentDate)/1000;
if(this.secLeft < 0)
 this.secLeft = 0;

}

getRocketDetails = async() => {
    
  try{
    const abort = new AbortController();
    const res = await fetch(this.launchDetails[this.launchId].rocket.configuration.url, {signal : abort.signal})
    .then((response) => response.json()) 
    .then((rocket) => { this.setState({rocketDetails : rocket}); })       
    
  }
  catch(error)
  {
    console.log("Rocket Api down");
    
    if(await AsyncStorage.getItem('@rocketDetails') != null)
     this.setState({rocketDetails : JSON.parse(await AsyncStorage.getItem('@rocketDetails'))});
    
  }

}

componentDidMount(){
  this.getRocketDetails();
  
 
}

  async componentWillUnmount(){
  this.setState({rocketDetails : []});
  await AsyncStorage.setItem('@rocketDetails',JSON.stringify(this.state.rocketDetails))
}


  render(){

    const countDown = this.state;

    const rocketFeatures = () => {
      return(
            <View style={{backgroundColor : '#DAF1F1',borderRadius : 30, elevation : 5,height : '182%'}}  >
                <ScrollView style={{flexGrow : 1,marginBottom : 10}} showsHorizontalScrollIndicator={true} >
                <View style={{marginTop :20,marginLeft : 10}}>
                <View>
                <View style={{flexDirection : 'row'}}>
                <Text style={{fontFamily : 'font', fontSize : 14, marginLeft : 8, marginTop : 3}}>Status :</Text>
                <Paragraph numberOfLines={3} style={{fontFamily : 'font-medium', fontSize : 14,width :'72%', marginLeft : 5,justifyContent : 'center'}}>{this.launchDetails[this.launchId].status.description}</Paragraph>
                </View>
                <View style={{flexDirection : 'row',marginTop : 10}}>
                <Text style={{fontFamily : 'font', fontSize : 14, marginLeft : 8, marginTop : 10}}>Rocket Name:</Text>
                <Text style={{fontFamily : 'font-medium', fontSize : 14, marginLeft : 5, marginTop : 10}}>{this.state.rocketDetails.full_name}</Text>
                </View>
                <View style={{flexDirection : 'row',marginTop : 10}}>
                <Text style={{fontFamily : 'font', fontSize : 14, marginLeft : 8, marginTop : 10}}>Description :</Text>
                <Paragraph numberOfLines={100} style={{fontFamily : 'font-medium', fontSize : 14,width :'70%', marginLeft : 5,marginTop : 10,textAlign :'justify'}}>{this.state.rocketDetails.description}</Paragraph>
                </View>
                <View style={{flexDirection : 'row',marginTop : 10}}>
                <Text style={{fontFamily : 'font', fontSize : 14, marginLeft : 8, marginTop : 10}}>Rocket Length : </Text>
                <Text style={{fontFamily : 'font', fontSize : 14, marginLeft : 8, marginTop : 10}}>{String(this.state.rocketDetails.length)}m</Text>
                </View>
                <View style={{flexDirection : 'row',marginTop : 10}}>
                <Text style={{fontFamily : 'font', fontSize : 14, marginLeft : 8, marginTop : 10}}>Rocket Diameter : </Text>
                <Text style={{fontFamily : 'font', fontSize : 14, marginLeft : 8, marginTop : 10}}>{String(this.state.rocketDetails.diameter)}m</Text>
                </View>
                </View>
                </View>
                </ScrollView>
                </View>
       )
    }
    
    return(
               <View>
               <View style={{ backgroundColor : '#EAF3F3',width : Dimensions.get("screen").width, height : Dimensions.get("screen").height}} >
               <View style={{flex : 2}}>
               <Image source={{ uri : this.launchDetails[this.launchId].image}} style={{height:'100%', width:'100%',overflow : 'hidden',resizeMode:'cover',}} />
               </View>
               <View style={{flex : 3}}>
               <Text style={{fontFamily : 'Outfit-Bold',marginTop : 15, fontSize : 23, justifyContent : 'center', marginLeft : 20,color : '#000000',width : '70%',height : '20%'}}>{this.launchDetails[this.launchId].name}</Text>
               <Card style={{backgroundColor : '#FEF1E6'}} mode={'elevated'}>
               <Card.Title title="CountDown" titleStyle={{fontFamily : 'font', fontSize : 15,}} titleNumberOfLines={1}/>
               <Card.Content>
               <CountDown until={this.secLeft} size={20}  digitStyle={{backgroundColor : '#FFA9A9'}} digitTxtStyle={{color :'#000000'}} running={this.state.countDown} onFinish={()=>{this.setState({countDown : false})}}/>
               </Card.Content>
               </Card>
               </View>
               <View style={{flex : 3,marginBottom: 240}}>
                  {rocketFeatures()}
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
    width : '75%',
    paddingTop : '30%',
    paddingLeft : 30,
    fontFamily : 'font',
    fontSize : 28,
    color : '#242124',
    letterSpacing : 0.5,
    textAlign : 'left',
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
   BottomBar : {
    flex : 1,
    flexDirection : 'row',
    width : '94%',
    height : 50,
    backgroundColor : '#e8f4f8', 
    borderRadius : 30,
    position : 'absolute',
    bottom : 18,
    justifyContent : 'center',
    alignItems : 'center',
    marginLeft : 15,
    elevation : 5,
    opacity : 0.8,
   },
   
  image : {
    borderRadius : 30,
    overflow : 'hidden'
  }
  


});