import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import * as Network from 'expo-network';
import styles from './styles';
import TouchableScale from 'react-native-touchable-scale';

// COMPONENTES
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TaskCard from '../../components/TaskCard';

// API
import api from '../../services/api';

export default function Home({ navigation }) {
  const [filter, setFilter] = useState('today');
  const [tasks, setTasks] = useState([]);
  const [load, setLoad] = useState(false);
  const [lateCount, setLateCount] = useState();
  const [macaddress, setMacaddress] = useState();

  async function getMacAddress() {
    await Network.getMacAddressAsync().then(mac => {
      setMacaddress(mac);
    });
  }

  async function loadTasks() {
    setLoad(true);
    await api.get(`/task/filter/${filter}/${macaddress}`)
      .then(response => {
        setTasks(response.data)
        setLoad(false)
      });
  }

  async function lateVerify() {
    await api.get(`/task/filter/late/${macaddress}`)
      .then(response => {
        setLateCount(response.data.length)
      });
  }

  async function taskDoneVerify() {
    await api.get(`/task/filter/TaskDone/${macaddress}`)
      .then(response => {
        setLateCount(response.data)
        setLoad(false)
      });
  }

  function Notification() {
    setFilter('late');
  }

  function DoneNotification() {
    setFilter('TaskDone');
  }

  function New() {
    navigation.navigate('Task');
  }

  function Show(id) {
    navigation.navigate('Task', { idtask: id });
  }

  useEffect(() => {
    getMacAddress().then(() => {
      loadTasks();
      //taskDoneVerify();
    });

    lateVerify();
  }, [filter, macaddress])

  return (
    <View style={styles.container}>
      <Header Done={DoneNotification} showNotification={true} showBack={false} pressNotification={Notification} late={lateCount} navigation={navigation} />

      <View style={styles.filter}>
        <TouchableScale onPress={() => setFilter('all')}>
          <Text style={filter == 'all' ? styles.filterTextActived : styles.filterTextInative}>Todos</Text>
        </TouchableScale>

        <TouchableScale onPress={() => setFilter('today')}>
          <Text style={filter == 'today' ? styles.filterTextActived : styles.filterTextInative}>Hoje</Text>
        </TouchableScale>

        <TouchableScale onPress={() => setFilter('week')}>
          <Text style={filter == 'week' ? styles.filterTextActived : styles.filterTextInative}>Semana</Text>
        </TouchableScale>

        <TouchableScale onPress={() => setFilter('month')}>
          <Text style={filter == 'month' ? styles.filterTextActived : styles.filterTextInative}>Mês</Text>
        </TouchableScale>

        <TouchableScale onPress={() => setFilter('year')}>
          <Text style={filter == 'year' ? styles.filterTextActived : styles.filterTextInative}>Ano</Text>
        </TouchableScale>
      </View>

      <View style={styles.title}>
        <Text style={styles.titleText}>TAREFAS {filter == 'late' && ' ATRASADAS' || filter == 'TaskDone' && ' CONCLUÍDAS'}</Text>
      </View>


      <ScrollView style={styles.content} contentContainerStyle={{ alignItems: 'center' }}>
        {
          load
            ?
            <ActivityIndicator color='#EE6B26' size={50} />
            :
            tasks.map((t, index) =>
            (
              <TaskCard
                done={t.done}
                title={t.title}
                when={t.when}
                type={t.type}
                onPress={() => Show(t._id)}
              />
            ))
        }
      </ScrollView>

      <Footer icon={'add'} onPress={New} />
    </View>
  )
}