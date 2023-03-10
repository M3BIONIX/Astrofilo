import React, {  Component } from "react";
import { StyleSheet, Animated, View,Easing} from "react-native";
import Lottie from "lottie-react-native";
import Svg, { Path } from "react-native-svg";
import LoginAuth from "./LoginAuth";



export default class Login extends Component {


  componentDidMount() {
    Animated.timing(this.animationProgress, {
      toValue: 1,
      duration: 4000,
      speed: 1.5,
      useNativeDriver: true
    }).start();
    
    Animated.timing(this.animation, {
      toValue : -200,
      duration: 1000,
      delay : 4000,
      useNativeDriver: true
  }).start(); 
  
  Animated.timing(this.textRight, {
    toValue : 8,
    duration: 1000,
    delay : 5000,
    useNativeDriver : true,
    }).start();

    Animated.timing(this.textLeft, {
      toValue : -8,
      duration: 1000,
      delay : 5000,
      useNativeDriver : true,
      }).start();

    Animated.timing(this.opacityRight, {
        toValue : 1,
        duration: 3000,
        delay : 5100,
        useNativeDriver : true,
      }).start();

    Animated.timing(this.opacityLeft, {
      toValue : 1,
      duration : 3000,
      delay : 5100,
      useNativeDriver : true,
    }).start();
      
    Animated.timing(this.opacityLine, {
      toValue : 1,
      duration : 1000,
      delay : 5000,
      useNativeDriver : true,
    }).start();

    Animated.timing(this.opacityAuth, {
      toValue : 1,
      duration : 1000,
      delay : 6000,
      useNativeDriver : true,
    }).start();
  }

    constructor(){
      super();
      this.animation = new Animated.Value(0);
      this.animationProgress = new Animated.Value(0);
      this.textRight = new Animated.Value(-40);
      this.textLeft = new Animated.Value(20);
      this.opacityRight = new Animated.Value(0);
      this.opacityLeft = new Animated.Value(0);
      this.opacityLine = new Animated.Value(0);
      this.opacityAuth = new Animated.Value(0);
    }

  
  



   render() {

    const logoAnimation = {
      transform : [ 
        {translateY : this.animation}
      ]
    }

    const textRightAnimation = {
      transform : [
        {translateX : this.textRight}
      ],
      opacity : this.opacityRight
    }

    const textLeftAnimation = {
      transform : [
        {translateX : this.textLeft}
      ],
      opacity : this.opacityLeft
    }

    const lineAnimation = {
      opacity : this.opacityLine
    }

    const AuthAnimation = {
      height : 100,
      width : 100,
      justifyContent : 'center',
      alignItems : 'center',
      position: 'absolute',
      paddingBottom : 270,
      opacity : this.opacityAuth
    }
    
    const path1 = [ "M5 153.007V0.993408" ]
    const path2 = [ 
    "M13.6658 0.812836H21.4893L35.1551 37.1872H27.5856L24.5882 28.5H10.5668L7.56952 37.1872H0L13.6658 0.812836ZM22.3529 22.2005L19.1016 13.107L17.7807 8.68717H17.3743L16.0535 13.107L12.8021 22.2005H22.3529Z" ,
    "M50.539 38C48.9811 38 47.4909 37.7799 46.0684 37.3396C44.6459 36.8993 43.342 36.2389 42.1566 35.3583C40.9713 34.4777 39.9383 33.4109 39.0577 32.1578C38.1771 30.8708 37.4828 29.3806 36.9748 27.6872L43.4267 25.1471C43.9009 26.9759 44.7306 28.5 45.916 29.7193C47.1014 30.9046 48.6593 31.4973 50.5898 31.4973C51.301 31.4973 51.9784 31.4127 52.6219 31.2433C53.2992 31.0401 53.8919 30.7692 54.4 30.4305C54.9418 30.0579 55.3652 29.6007 55.67 29.0588C55.9748 28.5169 56.1272 27.8904 56.1272 27.1791C56.1272 26.5018 56.0087 25.8922 55.7716 25.3503C55.5345 24.8084 55.1281 24.3004 54.5524 23.8262C54.0105 23.3521 53.2823 22.8948 52.3679 22.4545C51.4873 22.0143 50.3866 21.557 49.0657 21.0829L46.8304 20.2701C45.8483 19.9314 44.8492 19.4742 43.8331 18.8984C42.8509 18.3226 41.9534 17.6283 41.1406 16.8155C40.3278 16.0027 39.6504 15.0544 39.1085 13.9706C38.6005 12.8529 38.3465 11.5998 38.3465 10.2112C38.3465 8.78877 38.6174 7.46792 39.1593 6.24866C39.7351 4.99554 40.531 3.91177 41.547 2.99733C42.5969 2.04902 43.8331 1.32086 45.2556 0.812836C46.7119 0.270945 48.3206 0 50.0818 0C51.9107 0 53.4855 0.254011 54.8064 0.762034C56.1611 1.23619 57.2957 1.86275 58.2101 2.64171C59.1584 3.38681 59.9205 4.21658 60.4962 5.13102C61.072 6.04546 61.4953 6.90909 61.7663 7.72193L55.7208 10.262C55.3821 9.24599 54.7556 8.33155 53.8411 7.51872C52.9606 6.70588 51.7413 6.29947 50.1834 6.29947C48.6932 6.29947 47.457 6.65508 46.4748 7.36631C45.4926 8.04367 45.0016 8.94118 45.0016 10.0588C45.0016 11.1426 45.4757 12.074 46.424 12.8529C47.3723 13.598 48.8795 14.3262 50.9454 15.0374L53.2315 15.7995C54.6878 16.3075 56.0087 16.9002 57.1941 17.5775C58.4133 18.221 59.4463 19 60.293 19.9144C61.1736 20.8289 61.834 21.8788 62.2743 23.0642C62.7484 24.2157 62.9855 25.5535 62.9855 27.0775C62.9855 28.9742 62.596 30.6168 61.8171 32.0053C61.072 33.3601 60.1067 34.4777 58.9213 35.3583C57.736 36.2389 56.3982 36.8993 54.908 37.3396C53.4178 37.7799 51.9615 38 50.539 38Z" ,
    "M75.8603 37.1872V7.31551H65.6999V0.812836H92.879V7.31551H82.7186V37.1872H75.8603Z",
    "M97.7564 0.812836H111.016C112.845 0.812836 114.504 1.10071 115.994 1.67647C117.485 2.25223 118.755 3.04813 119.805 4.06417C120.888 5.08022 121.718 6.29947 122.294 7.72193C122.87 9.11052 123.157 10.6346 123.157 12.2941C123.157 13.5134 122.954 14.6649 122.548 15.7487C122.141 16.7986 121.583 17.7638 120.871 18.6444C120.16 19.4911 119.33 20.2531 118.382 20.9305C117.434 21.574 116.435 22.082 115.385 22.4545L115.334 22.8102L125.088 36.7807V37.1872H117.214L107.815 23.5214H104.615V37.1872H97.7564V0.812836ZM110.965 17.2219C112.523 17.2219 113.793 16.7478 114.775 15.7995C115.791 14.8512 116.299 13.6488 116.299 12.1925C116.299 11.549 116.181 10.9225 115.944 10.3128C115.74 9.70321 115.419 9.16132 114.978 8.68717C114.538 8.21301 113.979 7.84046 113.302 7.56952C112.658 7.26471 111.913 7.1123 111.067 7.1123H104.615V17.2219H110.965Z" ,
    "M146.482 38C143.772 38 141.249 37.5089 138.912 36.5267C136.609 35.5446 134.611 34.2068 132.917 32.5134C131.224 30.7861 129.886 28.7709 128.904 26.4679C127.956 24.131 127.482 21.6417 127.482 19C127.482 16.3583 127.956 13.8859 128.904 11.5829C129.886 9.24599 131.224 7.23084 132.917 5.53743C134.611 3.81016 136.609 2.45544 138.912 1.47326C141.249 0.491088 143.772 0 146.482 0C149.191 0 151.697 0.491088 154 1.47326C156.337 2.45544 158.352 3.81016 160.046 5.53743C161.739 7.23084 163.06 9.24599 164.008 11.5829C164.991 13.8859 165.482 16.3583 165.482 19C165.482 21.6417 164.991 24.131 164.008 26.4679C163.06 28.7709 161.739 30.7861 160.046 32.5134C158.352 34.2068 156.337 35.5446 154 36.5267C151.697 37.5089 149.191 38 146.482 38ZM146.482 31.4973C148.175 31.4973 149.75 31.1925 151.206 30.5829C152.696 29.9733 153.983 29.1266 155.067 28.0428C156.185 26.959 157.048 25.6551 157.658 24.131C158.302 22.5731 158.623 20.8627 158.623 19C158.623 17.1373 158.302 15.4439 157.658 13.9198C157.048 12.3619 156.185 11.041 155.067 9.95722C153.983 8.87344 152.696 8.02674 151.206 7.41711C149.75 6.80749 148.175 6.50267 146.482 6.50267C144.788 6.50267 143.196 6.80749 141.706 7.41711C140.25 8.02674 138.963 8.87344 137.845 9.95722C136.761 11.041 135.898 12.3619 135.254 13.9198C134.645 15.4439 134.34 17.1373 134.34 19C134.34 20.8627 134.645 22.5731 135.254 24.131C135.898 25.6551 136.761 26.959 137.845 28.0428C138.963 29.1266 140.25 29.9733 141.706 30.5829C143.196 31.1925 144.788 31.4973 146.482 31.4973Z" ,
     ]

    const path3 = [
    "M0.375977 1.15683H23.4402V7.6595H7.23427V16.4991H21.8145V23.0018H7.23427V37.5312H0.375977V1.15683Z" ,
    "M28.7041 1.15683H35.5624V37.5312H28.7041V1.15683Z" ,
    "M42.893 1.15683H49.7513V31.0285H65.1444V37.5312H42.893V1.15683Z" ,
    "M86.5083 38.344C83.7988 38.344 81.2757 37.8529 78.9388 36.8707C76.6357 35.8886 74.6375 34.5508 72.9441 32.8574C71.2507 31.1301 69.9129 29.1149 68.9307 26.8119C67.9824 24.475 67.5083 21.9857 67.5083 19.344C67.5083 16.7023 67.9824 14.2299 68.9307 11.9269C69.9129 9.58998 71.2507 7.57483 72.9441 5.88143C74.6375 4.15416 76.6357 2.79943 78.9388 1.81726C81.2757 0.835082 83.7988 0.343994 86.5083 0.343994C89.2177 0.343994 91.724 0.835082 94.027 1.81726C96.3639 2.79943 98.3791 4.15416 100.072 5.88143C101.766 7.57483 103.087 9.58998 104.035 11.9269C105.017 14.2299 105.508 16.7023 105.508 19.344C105.508 21.9857 105.017 24.475 104.035 26.8119C103.087 29.1149 101.766 31.1301 100.072 32.8574C98.3791 34.5508 96.3639 35.8886 94.027 36.8707C91.724 37.8529 89.2177 38.344 86.5083 38.344ZM86.5083 31.8413C88.2017 31.8413 89.7766 31.5365 91.2329 30.9269C92.7231 30.3173 94.0101 29.4706 95.0939 28.3868C96.2115 27.303 97.0751 25.9991 97.6848 24.475C98.3283 22.9171 98.65 21.2067 98.65 19.344C98.65 17.4813 98.3283 15.7878 97.6848 14.2638C97.0751 12.7058 96.2115 11.385 95.0939 10.3012C94.0101 9.21744 92.7231 8.37073 91.2329 7.76111C89.7766 7.15148 88.2017 6.84667 86.5083 6.84667C84.8149 6.84667 83.2231 7.15148 81.7329 7.76111C80.2766 8.37073 78.9896 9.21744 77.8719 10.3012C76.7881 11.385 75.9245 12.7058 75.281 14.2638C74.6714 15.7878 74.3666 17.4813 74.3666 19.344C74.3666 21.2067 74.6714 22.9171 75.281 24.475C75.9245 25.9991 76.7881 27.303 77.8719 28.3868C78.9896 29.4706 80.2766 30.3173 81.7329 30.9269C83.2231 31.5365 84.8149 31.8413 86.5083 31.8413Z" ,
     ]



      return (
       
       <View style={styles.layer}>
         <Animated.View style={logoAnimation}>
          <Lottie source={require("../assets/logo.json")} progress={this.animationProgress} 
            style ={styles.logo} 
           />
         </Animated.View>
         <Animated.View style={AuthAnimation}>
         <View>
         <LoginAuth />
         </View>        
         </Animated.View>
         <View style={styles.text}>
          
         <Animated.View style={textLeftAnimation}>         
           <Svg height={38} width={166} style={{marginRight : 10}}>
            {path2.map((d, i) => (
           <Path d={d} stroke="black" strokeWidth="1" key={i} fill="black" />
             ))}
           </Svg>
           </Animated.View>
           <Animated.View style={lineAnimation}>
           <Svg style={{marginTop : -10}} height={55} width={5}>
            {path1.map((d, i) => (
           <Path d={d} stroke="black" strokeWidth="15" key={i} fill="none" />
             ))}
           </Svg>
           </Animated.View>
           <Animated.View style={textRightAnimation}>
           <Svg height={39} width={106} style={{marginLeft : 10}} >
            {path3.map((d, i) => (
           <Path d={d} stroke="black" strokeWidth="1" key={i} fill="black" />
             ))}
           </Svg>
          
           </Animated.View>
           
          </View>
          
        </View>
        
      );
    }

  }

  const styles = StyleSheet.create({
    
    layer : {
     flex : 3,
     justifyContent : 'center',
     alignItems : 'center',
     backgroundColor : 'white',
     
    },
    logo :{
      width : 400,
      height : 400,
      justifyContent : 'center',
      alignItems : 'center',
      marginLeft : 30
    },
    text : {
      flex :1,
      height : 60,
      width : 5,
      position: 'absolute',
      flexDirection : 'row',
      justifyContent : 'center',
      } ,

    LoginAuth : {
      height : 100,
      width : 100,
      justifyContent : 'center',
      alignItems : 'center',
      position: 'absolute',
      paddingBottom : 270
    }

      
     
    });
  