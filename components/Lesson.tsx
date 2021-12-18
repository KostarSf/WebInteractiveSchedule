import React, { useState } from "react";
import { Text, Image, StyleSheet, View, TouchableHighlight } from 'react-native';

export interface ScheduleUser {
  userId: number;
  groupId: number;
}

export interface GroupSchedule {
  groupId: number;
  groupName: string;
  memberIds?: Array<number> | undefined;
  editorIds?: Array<number> | undefined;
  weeks: Array<iWeek>;
}

interface iWeek {
  name: string;
  days: Array<iDay>;
}

interface iDay {
  dayId: number;
  holyday?: boolean | undefined;
  lessons?: Array<iLesson> | undefined;
}

interface iLesson {
  orderId: number;
  time?: iLessonTime | undefined;
  classes: Array<iClass>;
}

interface iLessonTime {
  beginTime?: string | undefined;
  endTime?: string | undefined;
}

interface iClass {
  name: string;
  type: 'lecture' | 'practice' | 'laboratory' | 'event';
  note?: string | undefined;
  teacher?: iTeacher | undefined;
  classroom?: string | undefined;
  subgroup?: iSubgroup | undefined;
}

interface iTeacher {
  name: string;
  shortName: string;
}

interface iSubgroup {
  groupId: number;
  name: string;
}

export function CreateTeacher(name: string): iTeacher {
  let splittedName = name.split(' ');
  let shortName = splittedName[0] + ' ';
  if (splittedName.length <= 3) {
    for (let i = 1; i < splittedName.length; i++) {
      shortName += splittedName[i][0] + '.';
    }
  }
  return { name: name, shortName: shortName }
}

export type Props = {
  lesson: iLesson
}

const Lesson: React.FC<Props> = ({
  lesson
}) => {
  const [isTeacherFullNameShow, setIsTeacherFullNameShow] = useState(false);

  return (
    <Text>Пара</Text>
    // <TouchableHighlight underlayColor="#F3F7FF" style={{borderRadius: 5}}
    //   activeOpacity={1}
    //   onPress={() => setIsTeacherFullNameShow(!isTeacherFullNameShow)}>
    //   <View style={styles.lesson}>
    //     <View style={styles.lessonTimeContainer}>
    //       {showTime &&
    //         <>
    //           <Text style={styles.lessonBeginTime}>{beginTime}</Text>
    //           {endTime && <Text style={styles.lessonEndTime}>{endTime}</Text>}
    //         </>
    //       }
    //     </View>
    //     <View style={styles.lessonInfoContainer}>
    //       <View style={styles.lessonPrimaryInfo}>
    //         <Text style={styles.lessonName} ellipsizeMode="tail" numberOfLines={2}>
    //           {name}
    //         </Text>
    //         <View style={{flexDirection: "row", alignItems: "center"}}>
    //           {subgroupId > 0 ?
    //             <Text style={styles.subgroup}>{subgroupName}</Text> : <></>
    //           }
    //           <Image
    //             source={GetIconByLessonType(type)}
    //             style={{ width: 22, height: 22 }}
    //           />
    //         </View>
    //       </View>
    //       {type !== "event" ?
    //         <View style={styles.lessonSecondaryInfo}>
    //           <Text style={styles.teacherName}>
    //             {isTeacherFullNameShow ? teacherFullName : teacherName}
    //           </Text>
    //           <Text style={styles.classroom}>{classroom}</Text>
    //         </View> : <></>
    //       }
    //     </View>
    //   </View>
    // </TouchableHighlight>
  );
}

enum LessonType {
  Lecture = 'lecture',
  Practice = 'practice',
  Laboratory = 'laboratory',
  Mixed = 'mixed',
  Event = 'event',
}

function GetIconByLessonType(type: string | undefined) {
  switch (type) {
    case "lecture":
      return require('../assets/icons/lesson/lecture.png');
    case "practice":
      return require('../assets/icons/lesson/practice.png');
    case "laboratory":
      return require('../assets/icons/lesson/laboratory.png');
    case "mixed":
      return require('../assets/icons/lesson/mixed.png');
  }
  return require('../assets/icons/blank.png');
}

const styles = StyleSheet.create({
  lesson: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  lessonTimeContainer: {
    width: 50,
    marginRight: 10,
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
    flexShrink: 1,
  },
  subgroup: {
    marginHorizontal: 10,
    textAlignVertical: "center",
    fontFamily: 'RobotoCondensed',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.5
  },
  teacherName: {
    fontFamily: "Roboto-Light",
    fontSize: 14,
    lineHeight: 16,
    color: '#969696',
    marginRight: 10,
    flexShrink: 1
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
  },
});

export default Lesson;
