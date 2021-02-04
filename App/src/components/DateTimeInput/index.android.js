import React, { useState, useEffect } from 'react';
import {
  Image,
  TextInput,
  Alert
} from 'react-native'
import { format, isPast } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import TouchableScale from 'react-native-touchable-scale';

import styles from './styles';

import iconCalendar from '../../assets/calendar.png';
import iconClock from '../../assets/clock.png';

export default function DateTimeInputAndroid({ type, save, dated, hour }) {

  const [datetime, setDateTime] = useState();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);
  const [dateNow, setDateNow] = useState(new Date());

  useEffect(() => {
    if (type === 'date' && dated) {
      setDateTime(format(new Date(dated), 'dd/MM/yyyy'));
      save(format(new Date(dated), 'yyyy-MM-dd'));
    }
    if (type === 'time' && hour) {
      setDateTime(format(new Date(hour), 'HH:mm'));
      save(format(new Date(hour), 'HH:mm'));
    }
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    //setShow(Platform.OS === 'android');

    setShow(false);
    if (event.type !== 'dismissed') {


      if (type == 'date' && currentDate) {
        setDateTime(format(new Date(currentDate), 'dd/MM/yyyy'));
        save(format(new Date(currentDate), 'yyyy-MM-dd'));
      }
      if (type == 'time' && currentDate) {

        setDateTime(format(new Date(currentDate), 'HH:mm'));
        save(format(new Date(currentDate), 'HH:mm'));

      }
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showPicker = () => {
    showMode(type);
  };
  const Button = function(props) {
    return (
        <TouchableScale
            style={style.button}
            onPress={props.onPress}
            activeScale={0.7}
        >
            {props.children}
        </TouchableScale>
    );
};

  /*
    async function selectDataOrHour(){
      if(type == 'date'){
        const {action, year, month, day} = await DatePickerAndroid.open({
          mode: 'calendar'
        });
  
        if(action == DatePickerAndroid.dateSetAction)
          if(isPast(new Date(year, month, day, 24, 59, 56, 0))){ 
            return Alert.alert('Você não pode escolhar uma data passada!');
          }else{
            setDateTime(`${day} - ${month} - ${year}`); 
            save(format(new Date(year, month, day), 'yyyy-MM-dd'));
          }
      }else{
        const { action, hour, minute } = await TimePickerAndroid.open({
          is24Hour: true
        });
  
        if(action !== TimePickerAndroid.dismissedAction)
        setDateTime(`${hour}:${minute}`);
        save(format(new Date(2020, 12, 1, hour, minute, 0, 0), 'HH:mm:ss'));      
      }
    }*/

  return (
    <TouchableScale onPress={showPicker}>
      <TextInput
        style={styles.input}
        placeholder={type == 'date' ? 'Clique aqui para definir a data...' : 'Clique aqui para definir a hora...'}
        editable={false}
        value={datetime}
      />
      <Image
        style={styles.iconTextInput}
        source={type == 'date' ? iconCalendar : iconClock} />

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          minimumDate={new Date()}
        />
      )}

    </TouchableScale>
  )

}