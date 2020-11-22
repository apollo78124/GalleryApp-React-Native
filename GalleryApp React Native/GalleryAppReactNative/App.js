import React from 'react';
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import PresentationalComponent from './PresentationalComponent'
export default class App extends React.Component {
   
    constructor(props) {
      super(props);
      const RNFS = require('react-native-fs');
      var results = [];
      this.state = {
        dir: "./assets/",
        currentPosition: 0,
        photoList: [require('./assets/8b52.jpg'), require('./assets/alex.jpg'), require('./assets/fox.jpg'), require('./assets/image_02af.jpg'), require('./assets/image_13a.jpg'), require('./assets/image_43e.jpg'), require('./assets/image_49aba.jpg'), require('./assets/image_db0cc.jpg')],
        myState: require('./assets/8b52.jpg'),
        myText: 'I\'m ready to get swiped!',
      }; // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)

      console.log('--------------Beginning of List------------');
      //console.log(files);
      console.log('--------------End of List-------------------');
      
    }
    onSwipeLeft(gestureState) {
      this.setState({myText: 'You swiped left!'});
      this.imageLeft();
    }
  
    onSwipeRight(gestureState) {
      this.setState({myText: 'You swiped right!'});
      this.imageRight();
    }

    onSwipe(gestureName, gestureState) {
      const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
      this.setState({gestureName: gestureName});
      switch (gestureName) {
        case SWIPE_LEFT:
          this.setState({myText: 'You swiped left!'});
          break;
        case SWIPE_RIGHT:
          this.setState({myText: 'You swiped right!'});
          break;
      }
    }
   updateState = () => {
      this.state = { myState: 'The state is updated' };
   }

   imageRight = () => {
     if (this.state.currentPosition > this.state.photoList.length -2) {
      this.state.currentPosition = 0;
     } else {
      this.state.currentPosition++;
     }
    this.setState({myState: this.state.photoList[this.state.currentPosition]});
  }

  imageLeft= () => {
    if (this.state.currentPosition < 1) {
      this.state.currentPosition = this.state.photoList.length-1;
     } else {
      this.state.currentPosition--;
     }
     this.setState({myState: this.state.photoList[this.state.currentPosition]});
  }

   render() {
      const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
      };
      return (
         <View>
          <GestureRecognizer
              onSwipe={(direction, state) => this.onSwipe(direction, state)}
              onSwipeLeft={(state) => this.onSwipeLeft(state)}
              onSwipeRight={(state) => this.onSwipeRight(state)}
              config={config}
            >
              <PresentationalComponent myState = {this.state.myState} updateState = {this.updateState}/>
                <Image style = {{width: 450, height: 300}} source = { this.state.myState} />
                <Button
                  title="Left"
                  onPress={this.imageLeft}
                />
                <Button
                  title="Right"
                  onPress={this.imageRight}
                />
                  <Text>{this.state.myText}</Text>
              </GestureRecognizer>
			      </View>
		
      );
   }
}
