import { CreateDisplayTime, CreateTeacher, GroupSchedule } from "../components/Lesson";

export function GetTestSchedule(): GroupSchedule {
  let data: GroupSchedule = {
    groupId: 3,
    groupName: 'ИСИТ 2121',
    weeks: [
      {
        weekId: 0,
        name: 'нечетная',
        days: [
          {
            dayId: 0,
            lessons: [
              {
                orderId: 1,
                time: CreateDisplayTime(1),
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
                time: CreateDisplayTime(2),
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
                time: CreateDisplayTime(3),
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
            lessons: [
              {
                orderId: 2,
                time: CreateDisplayTime(2),
                classes: [
                  {
                    name: 'Математические основы программирования',
                    type: "lecture",
                    teacher: CreateTeacher('Духнич Евгений Иванович'),
                    classroom: 'Дистанционно',
                  }
                ]
              },
            ]
          },
          {
            dayId: 2,
            lessons: [
              {
                orderId: 0,
                time: CreateDisplayTime(0),
                classes: [
                  {
                    name: 'Построение',
                    type: "event",
                  }
                ]
              },
              {
                orderId: 1,
                time: CreateDisplayTime(1),
                classes: [
                  {
                    name: 'Операционные системы',
                    type: "lecture",
                    teacher: CreateTeacher('Малахов Сергей Олегович'),
                    classroom: '518а',
                  }
                ]
              },
              {
                orderId: 2,
                time: CreateDisplayTime(2),
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
                orderId: 3,
                time: CreateDisplayTime(3),
                classes: [
                  {
                    name: 'Теории информации',
                    type: "lecture",
                    teacher: CreateTeacher('Лицкевич Сергей Александрович'),
                    classroom: '518а',
                  }
                ]
              },
            ]
          }
        ]
      },
      {
        weekId: 1,
        name: 'четная',
        days: [
          {
            dayId: 0,
            lessons: [
              {
                orderId: 1,
                time: CreateDisplayTime(1),
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
                time: CreateDisplayTime(2),
                classes: [
                  {
                    name: 'Математические основы программирования',
                    type: "practice",
                    teacher: CreateTeacher('Духнич Евгений Иванович'),
                    classroom: 'Дистанционно',
                  }
                ]
              },
              {
                orderId: 3,
                time: CreateDisplayTime(3),
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
                time: CreateDisplayTime(0),
                classes: [
                  {
                    name: 'Построение',
                    type: "event",
                  }
                ]
              },
              {
                orderId: 1,
                time: CreateDisplayTime(1),
                classes: [
                  {
                    name: 'Информационные технологии',
                    type: "laboratory",
                    teacher: CreateTeacher('Лейзерович Яков Давыдович'),
                    classroom: '425',
                    subgroup: {groupId: 0, name: 'ПГ1'}
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
              {
                orderId: 2,
                time: CreateDisplayTime(2),
                classes: [
                  {
                    name: 'Технологии программирования',
                    type: "laboratory",
                    teacher: CreateTeacher('Сливанков Юрий Вячеславович'),
                    classroom: '401',
                  }
                ]
              },
              {
                orderId: 3,
                time: CreateDisplayTime(3),
                classes: [
                  {
                    name: 'Операционные системы',
                    type: "laboratory",
                    teacher: CreateTeacher('Малахов Сергей Олегович'),
                    classroom: '401',
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
