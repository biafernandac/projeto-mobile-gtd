import React from 'react';
import {
  View, 
  Image, 
  Text
} from 'react-native';

import styles from './styles';

import add from '../../assets/add.png';
import save from '../../assets/save.png';
import TouchableScale from 'react-native-touchable-scale';
export default function Footer({ icon, onPress }){
  return(
    
    <View style={styles.container}>
      <TouchableScale style={styles.button} onPress={onPress}>
        <Image source={ icon == 'add' ? add : save } style={styles.image}/>
      </TouchableScale>

      <Text style={styles.text}>
        Organizando sua vida
      </Text>
    </View>
  )
}
