import React, { useState } from "react";
import { Text, ScrollView, StyleSheet, View, Image, Platform } from 'react-native';
import WeekButton from '../components/WeekButton';
import Lesson, { GroupSchedule } from "../components/Lesson";
import { GetTestSchedule } from "../utils/TestUtils";

const weekDays: Array<iWeekDay> = [
  {
    id: 0,
    name: 'Понедельник',
    shortName: 'ПН',
  },
  {
    id: 1,
    name: 'Вторник',
    shortName: 'ВТ',
  },
  {
    id: 2,
    name: 'Среда',
    shortName: 'СР',
  },
  {
    id: 3,
    name: 'Четверг',
    shortName: 'ЧТ',
  },
  {
    id: 4,
    name: 'Пятница',
    shortName: 'ПТ',
  },
  {
    id: 5,
    name: 'Суббота',
    shortName: 'СБ',
  },
  {
    id: 6,
    name: 'Воскресенье',
    shortName: 'ВС',
  },
]

interface iWeekDay {
  id: number;
  name: string;
  shortName: string;
}

export type Props = {
  schedule: GroupSchedule
}

const Schedule: React.FC<Props> = ({
  schedule,
}) => {
  const [activeWeek, setActiveWeek] = useState(0);
  const [activeDay, setActiveDay] = useState(2);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [currentDay, setCurrentDay] = useState(0);
  const [currentSubgroup, setCurrentSubgroup] = useState(0);

  const onDayButtonPress = (dayId: number) => {
    setActiveDay(dayId);
  }

  function isDayIsHolyday(weekId: number, dayId: number): boolean {
    let day = getDayById(weekId, dayId);
    return day === undefined ||
      day.lessons === undefined ||
      day.holyday === true
  }

  function getDayById(weekId: number, dayId: number) {
    return schedule.weeks[weekId].days.find((item) => {
      return item.dayId === dayId;
    })
  }

  return (
    <>
      <ScrollView style={{ backgroundColor: '#FBFCFF' }}>
        <View style={styles.dayCard}>
          <View style={styles.dayInfo}>
            <Text style={styles.dayName}>
              {weekDays[activeDay].name}
            </Text>
            <Text style={styles.weekName}>{schedule.weeks[activeWeek].name} неделя</Text>
          </View>
          { !isDayIsHolyday(activeWeek, activeDay) &&
            <View style={styles.lessonsList}>
              {getDayById(activeWeek, activeDay)?.lessons?.map((lesson) => (
                <Lesson key={lesson.orderId} lesson={lesson}
                  subgroup={currentSubgroup}
                />
              ))}
            </View>
          }
        </View>
        {isDayIsHolyday(activeWeek, activeDay) &&
          <View style={styles.weekend}>
            <Text style={styles.weekendText}>Выходной</Text>
          </View>
        }
      </ScrollView>
      <View style={styles.weekButtons}>
        <ScrollView horizontal={true} contentContainerStyle={{flexGrow: 1}}
          showsHorizontalScrollIndicator={false}
        >
          {weekDays.map((day) => (
            <WeekButton key={day.id} dayId={day.id} dayName={weekDays[day.id].shortName}
              active={day.id === activeDay} current={day.id === currentDay}
              holyday={isDayIsHolyday(activeWeek, day.id)}
              onPress={onDayButtonPress} />
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  weekButtons: {
    height: 60,
    flexDirection: 'row'
  },
  weekButtonsWeb: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    flexDirection: 'row'
  },
  dayCard: {
    marginBottom: 50
  },
  dayInfo: {
    backgroundColor: '#F3F7FF',
    padding: 10,
  },
  dayName: {
    fontFamily: 'Roboto-Medium',
    color: '#44435C',
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 18,
    lineHeight: 21
  },
  weekName: {
    marginTop: 2,
    textAlign: "center",
    fontFamily: 'Roboto',
    textTransform: "uppercase",
    fontSize: 12,
    color: '#A8A7B5'
  },
  lessonsList: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  weekend: {
    marginTop: 120
  },
  weekendText: {
    textAlign: "center",
    fontFamily: 'Roboto',
    textTransform: "uppercase",
    letterSpacing: 1,
    fontSize: 24,
    color: '#ACABB7'
  }
});

export default Schedule;
