import React, { useState } from "react";
import { Text, ScrollView, StyleSheet, View, Image } from 'react-native';
import WeekButton from '../components/WeekButton';

export type Props = {}

const data = [
  { id: 0, dayShort: 'ПН', dayName: 'Понедельник' },
  { id: 1, dayShort: 'ВТ', dayName: 'Вторник', lessons: [
    {
      name: "Математические основы программирования",
      type: "lecture",
      beginTime: "10:40",
      endTime: "12:10",
      teacherName: "Духнич Е.И.",
      teacherFullName: "Духнич Евгений Иванович",
      classroom: "Дистанционно"
    }
  ] },
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
              <View style={styles.lessonTimeContainer}>
                <Text style={styles.lessonBeginTime}>10:40</Text>
                <Text style={styles.lessonEndTime}>12:10</Text>
              </View>
              <View style={styles.lessonInfoContainer}>
                <View style={styles.lessonPrimaryInfo}>
                  <Text style={styles.lessonName}>
                    Математические основы программирования
                  </Text>
                  <Image
                    source={require('../assets/icons/lecture.png')}
                    style={{width: 22, height: 22}}
                  />
                </View>
                <View style={styles.lessonSecondaryInfo}>
                  <Text style={styles.teacherName}>Духнич Е.И.</Text>
                  <Text style={styles.classroom}>ДИСТАНЦИОННО</Text>
                </View>
              </View>
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
    padding: 20,
  },
  lesson: {
    flexDirection: "row",
    alignItems: "center",
  },
  lessonTimeContainer: {
    width: 50,
    marginRight: 10
  },
  lessonBeginTime: {
    fontFamily: "Roboto-Medium",
    fontSize: 18,
    lineHeight: 21,
    color: '#44435C',
    textAlign: "center",
  },
  lessonEndTime: {
    fontFamily: "Roboto",
    fontSize: 10,
    lineHeight: 12,
    color: '#9c9c9c',
    textAlign: "center",
  },
  lessonInfoContainer: {
    flex: 1,
    flexShrink: 1
  },
  lessonPrimaryInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  lessonSecondaryInfo: {
    marginTop: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  lessonName: {
    fontFamily: "Roboto",
    fontSize: 14,
    lineHeight: 16,
    color: '#44435C',
  },
  teacherName: {
    fontFamily: "Roboto-Light",
    fontSize: 14,
    lineHeight: 16,
    color: '#969696',
  },
  classroom: {
    borderWidth: 1,
    borderColor: '#969696',
    borderRadius: 1,
    paddingVertical: 1,
    paddingHorizontal: 5,
    fontFamily: 'Roboto',
    color: '#969696',
    fontSize: 9,
    lineHeight: 11,
    textAlignVertical: "center",
    textAlign: "center",
    textTransform: "uppercase"
  }
});

export default Schedule;
