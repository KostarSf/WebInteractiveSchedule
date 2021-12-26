import { CreateTeacher, GroupSchedule } from "../components/Lesson";

export function GetTestSchedule(): GroupSchedule {
  let data: GroupSchedule = {
    groupId: 3,
    groupName: 'ИСИТ 2121',
    weeks: [
      {
        weekId: 3,
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
            dayId: 2,
            lessons: [
              {
                orderId: 0,
                time: { beginTime: '8:40' },
                classes: [
                  {
                    name: 'Построение',
                    type: "event",
                  }
                ]
              },
              {
                orderId: 1,
                time: { beginTime: '9:00', endTime: '10:30' },
                classes: [
                  {
                    name: 'Информационные технологии',
                    type: "laboratory",
                    teacher: CreateTeacher('Лейзерович Яков Давыдович'),
                    classroom: '425',
                    subgroup: { groupId: 0, name: 'ПГ1' }
                  },
                  {
                    name: 'Технологии программирования',
                    type: "laboratory",
                    teacher: CreateTeacher('Сливанков Юрий Вячеславович'),
                    classroom: '401',
                    subgroup: { groupId: 1, name: 'ПГ2' }
                  }
                ]
              },
            ]
          }
        ]
      }
    ]
  }
  return data;
}
