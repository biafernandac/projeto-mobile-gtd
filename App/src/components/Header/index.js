import React from 'react';
import { Text, View, Image } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';

import styles from './styles';

// ICONES
import logo from '../../assets/logo.png';
import bell from '../../assets/bell.png';
import doneTask from '../../assets/doneTask.png';
import back from '../../assets/back.png';


export default function Header({ Done, showNotification, showBack, pressNotification, late, navigation }) {
  function Back() {
    navigation.navigate('Home');
  }

  function OpenQrCode() {
    navigation.navigate('QrCode');
  }

  return (
    <View style={styles.header}>

      {
        showBack ?
          <TouchableScale style={styles.leftIcon} onPress={Back}>
            <Image source={back} style={styles.leftIconImage} />
          </TouchableScale>
          :
          <TouchableScale style={styles.leftIcon} onPress={Done}>
            <Image source={doneTask} style={styles.leftIconImage} />
          </TouchableScale>
      }


      <Image source={logo} style={styles.logo} />

      {
        showNotification && late > 0 &&
        <TouchableScale style={styles.notification} onPress={pressNotification}>
          <Image source={bell} style={styles.notificationImage} />
          <View style={styles.circle}>
            <Text style={styles.notificationText}>{late}</Text>
          </View>
        </TouchableScale>
      }

    </View>
  )
}