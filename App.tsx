import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, View, StatusBar as SBar, TouchableHighlight } from 'react-native';
import { useFonts } from 'expo-font';
import Schedule, { ScheduleState } from './screens/Schedule';
import Options from './screens/Options';
import { GroupSchedule } from './components/Lesson';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { GetTestSchedule } from './utils/TestUtils';

export default function App() {
  const [loaded] = useFonts({
    'Roboto': require('./assets/fonts/roboto/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/roboto/Roboto-Bold.ttf'),
    'Roboto-Medium': require('./assets/fonts/roboto/Roboto-Medium.ttf'),
    'Roboto-Light': require('./assets/fonts/roboto/Roboto-Light.ttf'),
    'RobotoCondensed': require('./assets/fonts/roboto-condensed/RobotoCondensed-Regular.ttf'),
    'RobotoCondensed-Bold': require('./assets/fonts/roboto-condensed/RobotoCondensed-Bold.ttf'),
    'RobotoCondensed-Light': require('./assets/fonts/roboto-condensed/RobotoCondensed-Light.ttf'),
    'RobotoSlab': require('./assets/fonts/roboto-slab/RobotoSlab-VariableFont_wght.ttf'),
  });

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isLoginedIn, setIsLoginedIn] = useState(false);
  const [groupName, setGroupName] = useState("Расписание");
  const [subtitleText, setSubtitleText] = useState("");

  let startScheduleState: ScheduleState = {
    data: undefined,
    state: 'loading'
  }
  const [scheduleData, setScheduleData] = useState(startScheduleState);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    if (token !== null) {
      SetStoredUserToken(token)
      window.location.href = "/";
    }

    // SetStoredUserToken('XVlBzgbaiCMRAjWwhTHctcuAxhxKQFDaFpLSjFbc');
    GetStoredUserToken().then((token) => {
      if (token === null) {
        setScheduleData({ data: undefined, state: 'error' });
        return;
      }

      setIsLoginedIn(true);

      let userGet = 'https://aumsu-portal.admire.social/api/user';
      axios.get<userDataQuery>(
        userGet,
        { headers: { "Authorization": `${token}` } }
      ).then((response) => {
        // console.log('User response:');
        // console.log(response.data);

        setGroupName(response.data.study_group.name);
        setSubtitleText("РАСПИСАНИЕ");

        let groupGet = 'https://aumsu-portal.admire.social/api/schedule/'
          + response.data.study_group_id;
        // console.log('Schedule response: ');

        axios.get<scheduleDataQuery>(
          groupGet,
          { headers: { "Authorization": `${token}` } }
        ).then((response) => {
          // console.log(response.data.content)
          setScheduleData({
            data: response.data.content,
            state: 'ready'
          });
        }).catch((reason) => {
          console.log(reason);
          setScheduleData({data: undefined, state: 'notexist'});
        })
      }).catch((reason) => {
        console.log(reason);
        setScheduleData({ data: undefined, state: 'error' });
      })
    });
  }, []);

  const onDemoEnable = () => {
    //setDemoEnable(true);
    setScheduleData({
      state: 'ready',
      data: GetTestSchedule()
    })
  }

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./assets/icons/app_logo.png') }
          style={{width: 22, height: 22, marginLeft: 20}}
        />
        <View style={{paddingLeft: 10, flex: 1}}>
          <Text style={styles.appTitle}>{groupName}</Text>
          <Text style={styles.appSubtitle}>{subtitleText}</Text>
        </View>
        <TouchableHighlight
          underlayColor="#F3F7FF"
          onPress={() => setIsSideMenuOpen(!isSideMenuOpen)}
        >
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}>
            <Image
              source={isSideMenuOpen ?
                require('./assets/icons/close.png') :
                require('./assets/icons/side_menu.png')}
              style={{ width: 22, height: 22 }}
            />
          </View>
        </TouchableHighlight>
      </View>
      {isSideMenuOpen ? <Options /> : <Schedule schedule={scheduleData} onDemoPress={onDemoEnable}/> }
      <StatusBar style="auto" />
    </View>
  );
}
interface userDataQuery {
  avatar: string;
  created_at: string;
  first_name: string;
  id: number;
  last_name: string;
  login: string;
  password: string;
  patronymic: string;
  status: string;
  study_group: studyGroupDataQuery;
  study_group_id: number;
  token: string;
  updated_at: string;
}


interface studyGroupDataQuery {
  created_at: string;
  id: number;
  name: string;
  updated_at: string;
}

interface scheduleDataQuery {
  content: GroupSchedule;
  created_at: string;
  id: number;
  study_group_id: 3;
  updated_at: string;
}

const GetStoredUserToken = async () => {
  try {
    let token = await AsyncStorage.getItem('user_token');
    // console.log('User token: ' + token);
    return token;
  } catch(e) {
    console.log("Error reading user token");
    console.log(e);
    return null;
  }
}

const SetStoredUserToken = async (value:string) => {
  try {
    await AsyncStorage.setItem('user_token', value)
  } catch(e) {
    console.log("Error setting user token");
    console.log(e);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch'
  },
  header: {
    marginTop: SBar.currentHeight,
    flexDirection: 'row',
    alignItems: 'center',
    height: 75
  },
  appTitle: {
    fontSize: 18,
    lineHeight: 24,
    color: '#44435C',
    letterSpacing: 1,
    fontFamily: 'RobotoSlab',
    textTransform: 'uppercase'
  },
  appSubtitle: {
    fontSize: 10,
    lineHeight: 12,
    color: '#C0C3CF',
    letterSpacing: 0.5,
    fontFamily: 'Roboto',
    textTransform: 'uppercase'
  }
});
