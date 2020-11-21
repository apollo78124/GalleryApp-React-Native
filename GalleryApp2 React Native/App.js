import React from 'react';
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native';
import PresentationalComponent from './PresentationalComponent'
export default class App extends React.Component {
   state = {
      myState: require('./img/alex.jpg')
	  }
   
   updateState = () => {
      this.setState({ myState: 'The state is updated' })
   }
   render() {
      return (
         <View>
            <PresentationalComponent myState = {this.state.myState} updateState = {this.updateState}/>
			 <Image style = {{width: 450, height: 450}} source = { this.state.myState} />
			 <Button
        title="Press me"
        onPress={() => this.setState({myState: require('./img/fox.jpg')})}
      />
			         </View>
		
      );
   }
}
