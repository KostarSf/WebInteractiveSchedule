import React, { useState } from "react";
import { Text, ScrollView, StyleSheet, View } from 'react-native';
import WeekButton from '../components/WeekButton';

export type Props = {}

const data = [
  { id: 0, dayShort: 'ПН', dayName: 'Понедельник' },
  { id: 1, dayShort: 'ВТ', dayName: 'Вторник' },
  { id: 2, dayShort: 'СР', dayName: 'Среда' },
  { id: 3, dayShort: 'ЧТ', dayName: 'Четверг' },
  { id: 4, dayShort: 'ПТ', dayName: 'Пятница' },
]

const Schedule: React.FC<Props> = ({ }) => {
  const [activeDay, setActiveDay] = useState(0);

  const onDayButtonPress = (dayId: number) => {
    setActiveDay(dayId);
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: '#FBFCFF' }}>
        <View style={styles.dayCard}>
          <Text style={styles.dayName}>{data[activeDay].dayName}</Text>
          <View style={styles.lessonsList}>
            <View style={styles.lesson}>

            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.weekButtons}>
        {data.map((item) => (
          <WeekButton key={item.id} dayId={item.id} dayName={item.dayShort}
            active={item.id === activeDay} onPress={onDayButtonPress}/>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  weekButtons: {
    height: 50,
    flexDirection: 'row'
  },
  dayCard: {
    backgroundColor: 'white',
    marginTop: 20,
  },
  dayName: {
    backgroundColor: '#F3F7FF',
    padding: 10,
    fontFamily: 'Roboto',
    color: '#44435C',
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 18,
    lineHeight: 21
  },
  lessonsList: {
    padding: 20
  },
  lesson: {
    flexDirection: "row",
  }
});

export default Schedule;
