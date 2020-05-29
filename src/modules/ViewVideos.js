import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  PixelRatio,
  Platform,
  Dimensions,
} from 'react-native';
import YouTube, {
  YouTubeStandaloneIOS,
  YouTubeStandaloneAndroid,
} from 'react-native-youtube';

export default class ReactNativeYouTubeExample extends React.Component {
  state = {
    isReady: false,
    status: null,
    error: null,
    playerWidth: Dimensions.get ('window').width,
  };

  _youTubeRef = React.createRef ();

  volver = () => {
    this.props.navigation.goBack (null);
    return true;
  };

  render () {
    let videoId = this.props.navigation.getParam ('video', '');
    return (
      <View style={styles.container}>
        <YouTube
          ref={this._youTubeRef}
          apiKey="AIzaSyAty2VOce90ppjzrJp7u9f3Z51Ya7iACso"
          videoId={videoId}
          play
          loop={true}
          controls={1}
          style={[
            {
              height: PixelRatio.roundToNearestPixel (
                this.state.playerWidth / (16 / 9)
              ),
            },
            styles.player,
          ]}
          onError={e => {
            this.setState ({error: e.error});
            console.log (e);
          }}
        />
        {Platform.OS === 'ios'
          ? <TouchableOpacity onPress={this.volver} style={styles.button}>
              <Text style={styles.buttonText}>Atras</Text>
            </TouchableOpacity>
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignContent: 'center',
  },
  player: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textDecorationLine: 'underline',
  },
});
