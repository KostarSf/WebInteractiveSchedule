import { CreateTeacher, GroupSchedule } from "../components/Lesson";

export function GetTestSchedule(): GroupSchedule {
  return {
    groupId: 0,
    groupName: 'ИСИТ 2121',
    weeks: [
      {
        name: 'нечетная',
        days: [
          {
            dayId: 0,
            lessons: [
              {
                orderId: 1,
                time: { beginTime: '9:00', endTime: '10:30' },
                classes: [
                  {
                    name: 'Физ. воспитание',
                    type: "practice",
                    teacher: CreateTeacher('Аникиенко Жанна Глебовна'),
                    classroom: 'Спортзал',
                  }
                ]
              },
              {
                orderId: 2,
                time: { beginTime: '10:40', endTime: '12:10' },
                classes: [
                  {
                    name: 'Схемотехника',
                    type: "practice",
                    teacher: CreateTeacher('Духнич Евгений Иванович'),
                    classroom: 'Дистанционно',
                  }
                ]
              },
              {
                orderId: 3,
                time: { beginTime: '12:20', endTime: '13:50' },
                classes: [
                  {
                    name: 'Схемотехника',
                    type: "practice",
                    teacher: CreateTeacher('Духнич Евгений Иванович'),
                    classroom: 'Дистанционно',
                  }
                ]
              }
            ]
          },
          {
            dayId: 1,
          },
          {
            dayId: 2,
          },
          {
            dayId: 3,
          },
          {
            dayId: 4,
          },
          {
            dayId: 5,
          },
          {
            dayId: 6,
          }
        ]
      }
    ]
  }
}
