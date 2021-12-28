import React, { useState } from "react";
import { Text, ScrollView, StyleSheet, View, Image, Platform, TouchableOpacity } from 'react-native';
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

export interface ScheduleState {
  data: GroupSchedule | undefined;
  state: "loading" | "error" | "ready" | "notexist"
}

export type Props = {
  schedule: ScheduleState,
  onDemoPress?: () => void,
}

const Schedule: React.FC<Props> = ({
  schedule,
  onDemoPress = undefined,
}) => {
  const [activeWeek, setActiveWeek] = useState(0);
  const [activeDay, setActiveDay] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [currentDay, setCurrentDay] = useState(0);

  const onDemoPressHook = () => {
    if (onDemoPress !== undefined) {
      onDemoPress();
    }
  }

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
    return schedule.data?.weeks[weekId].days.find((item) => {
      return item.dayId === dayId;
    })
  }



  if (schedule.state !== "ready") {
    return (
      <ScrollView style={styles.errorContainer}
        contentContainerStyle={{justifyContent: "center", flex: 1}}
      >
        <Text style={styles.errorText}>
          {
            schedule.state === "loading" ? "Загрузка" :
            schedule.state === "notexist" ? "Расписание для вас ещё не готово" :
            schedule.state === "error" ? "Ошибка авторизации" : ""
          }
        </Text>
        <TouchableOpacity style={styles.demoButton} onPress={onDemoPressHook}>
          <Text style={styles.demoButtonText}>Демонстрационное расписание</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }

  return (
    <>
      <ScrollView style={{ backgroundColor: '#FBFCFF' }}>
        <View style={styles.dayCard}>
          <View style={styles.dayInfo}>
            <Text style={styles.dayName}>
              {weekDays[activeDay].name}
            </Text>
            <Text style={styles.weekName}>{schedule.data?.weeks[activeWeek].name} неделя</Text>
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
  demoButton: {
    backgroundColor: '#99B9F5',
    alignSelf: "center",
    width: 220,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 3
  },
  demoButtonText: {
    color: 'white',
    fontFamily: 'RobotoCondensed-Bold',
    textAlign: "center",
    letterSpacing: .5,
    textTransform: "uppercase"
  },
  errorContainer: {
    backgroundColor: '#FBFCFF',
  },
  errorText: {
    textAlign: "center",
    fontFamily: 'Roboto',
    color: '#A8A7B5',
    textTransform: "uppercase",
    fontSize: 18,
    lineHeight: 21,
    padding: 40
  },
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
