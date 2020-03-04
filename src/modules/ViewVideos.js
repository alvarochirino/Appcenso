
import React from 'react';
import {
   StyleSheet,
   View,
   Text,
   ScrollView,
   TouchableOpacity,
   PixelRatio,
   Platform,
   Button,
   Dimensions,
} from 'react-native';
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';

export default class ReactNativeYouTubeExample extends React.Component {
   state = {
      isReady: false,
      status: null,
      error: null,
      isPlaying: true,
      isLooping: true,
      fullscreen: false,
      playerWidth: Dimensions.get('window').width,
   };

   _youTubeRef = React.createRef();

   volver = () => {
      this.props.navigation.goBack(null);
      return true;
   };

   render() {
      let videoId = this.props.navigation.getParam('video', '')
      return (
         <View style={styles.container}>
            <YouTube
               ref={this._youTubeRef}
               apiKey="AIzaSyAty2VOce90ppjzrJp7u9f3Z51Ya7iACso"
               videoId={videoId}
               play={this.state.isPlaying}
               loop={this.state.isLooping}
               fullscreen={this.state.fullscreen}
               controls={1}
               style={[
                  { height: PixelRatio.roundToNearestPixel(this.state.playerWidth / (16 / 9)) },
                  styles.player,
               ]}
               onError={e => {
                  this.setState({ error: e.error });
                  console.log(e)
               }}
            />
            {Platform.OS === 'ios' ?
               <TouchableOpacity onPress={this.volver} style={styles.button}>
                  <Text style={styles.buttonText}>Atras</Text>
               </TouchableOpacity>
               : null
            }
            {/* <Text style={styles.instructions}>
               {this.state.isReady ? 'Player is ready' : 'Player setting up...'}
            </Text>
            <Text style={styles.instructions}>Status: {this.state.status}</Text>
            <Text style={styles.instructions}>
               {this.state.error ? 'Error: ' + this.state.error : ''}
            </Text> */}

            {/* Fullscreen */}
            {/* {!this.state.fullscreen && (
               <View style={styles.buttonGroup}>
                  <Button
                     title="Set Fullscreen"
                     onPress={() => {
                        this.setState({ fullscreen: true });
                     }}
                  />
               </View>
            )} */}

         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'black',
      justifyContent: 'center',
      alignContent: 'center',
   },
   buttonGroup: {
      flexDirection: 'row',
      alignSelf: 'center',
      paddingBottom: 5,
   },
   instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
   },
   player: {
      alignSelf: 'stretch',
      marginVertical: 10,
   },
   button: {
      alignItems: 'center'
   },
   buttonText: {
      color: 'white',
      textDecorationLine: 'underline'
   },
});
