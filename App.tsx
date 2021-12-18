import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, Image, View, StatusBar as SBar, TouchableHighlight } from 'react-native';
import { useFonts } from 'expo-font';
import Schedule from './screens/Schedule';
import Options from './screens/Options';

const data = {
  groupName: 'ИСИТ 2121'
}

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
          <Text style={styles.appTitle}>{data.groupName}</Text>
          <Text style={styles.appSubtitle}>РАСПИСАНИЕ</Text>
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
      {isSideMenuOpen ? <Options /> : <Schedule /> }
      <StatusBar style="auto" />
    </View>
  );
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
