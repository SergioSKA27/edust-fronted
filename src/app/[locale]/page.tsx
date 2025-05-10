'use client'
import { CardDemo } from '@/components/dashboard/Notifications'
import { MainBreadcrumb } from '@/components/breadcrumb/MainBreadcrumb'
import {useTranslations} from 'next-intl';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import CourseCard from '@/components/courses/coursecard';
import NextActivitiesCard from "@/components/activities/nextacts";
import ActivityCalendar from '@/components/calendar/activitycalendar';


// Define el tipo para un elemento del breadcrumb
interface BreadcrumbItemType {
  label: string;
  href?: string; // Opcional para el último elemento que es solo texto
}
const breadcrumbHome: BreadcrumbItemType = {
  label: 'Inicio',
  href: '#',
}

const breadcrumbDashboard: BreadcrumbItemType = {
  label: 'Dashboard',
  href: '#',
}

const dummyCourses = [
  {
    courseName: 'Cálculo Diferencial I',
    courseDescription: 'Tema 1: Límites y Continuidad',
    courseProgress: 10,
    participantsAvatars: ['avatar1.png', 'avatar2.png', 'avatar3.png', 'avatar4.png'],
    favorite: false,
    category: 'Semestre 1',
    completedLessons: 5,
    totalLessons: 10,
  },
  {
    courseName: 'Métodos Numéricos I',
    courseDescription: 'Tema 6: Integración Numérica',
    courseProgress: 75,
    participantsAvatars: ['avatar1.png', 'avatar2.png', 'avatar3.png'],
    favorite: true,
    category: 'Semestre 2',
    completedLessons: 8,
    totalLessons: 10,
  },
  {
    courseName: 'Introducción a la Programación en Python',
    courseDescription: 'Tema 3: Estructuras de Control',
    courseProgress: 20,
    participantsAvatars: ['avatar1.png', 'avatar2.png'],
    favorite: false,
    category: 'Curso Libre',
    completedLessons: 2,
    totalLessons: 10,
  },
];

const activities: Activity[] = [
  {
      id: "1",
      number: "01",
      type: "lesson",
      title: "Introduction to Creative Writing",
      subtitle: "Creative writing for beginners",
      instructor: {
          name: "Conner Garcia",
          avatar: "/avatars/conner.png"
      },
      duration: "22 min",
      date: new Date("2025-10-01T12:00:00Z") // Fecha de la actividad
  },
  {
      id: "2",
      number: "03",
      type: "lesson",
      title: "Foundations of Public Speaking",
      subtitle: "Public Speaking and Leadership",
      instructor: {
          name: "Saira Goodman",
          avatar: "/avatars/saira.png"
      },
      duration: "40 min",
      date:  new Date("2025-10-05T10:00:00Z") // Fecha de la actividad

  },
  {
      id: "3",
      number: "A2",
      type: "assignment",
      title: "Weekly Writing Exercise",
      subtitle: "Submit your creative story",
      instructor: {
          name: "Conner Garcia",
          avatar: "/avatars/conner.png"
      },
      duration: "45 min",
      date: new Date("2025-10-10T12:00:00Z") // Fecha de la actividad
      
  },
  {
      id: "4",
      number: "E1",
      type: "exam",
      title: "Mid-term Assessment",
      subtitle: "Public Speaking principles",
      instructor: {
          name: "Saira Goodman",
          avatar: "/avatars/saira.png"
      },
      duration: "60 min",
      date: new Date("2025-10-15T10:00:00Z") // Fecha de la actividad
  },
];


// map the activities into interface Activity



export default function Home() {
  const t = useTranslations('Home');
  return (
    <div className="w-full mx-auto">
      <MainBreadcrumb
        items={[
          breadcrumbHome,
          breadcrumbDashboard
        ]}
      />
      <div className="flex flex-col gap-2 p-2 pl-0">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-2xl font-bold">{t('mycourses')}</h1>
          <Button variant="link" className="text-sm text-slate-900 dark:text-slate-200 hover:text-slate-700 dark:hover:text-slate-300" onClick={() => {}}>
            {t('viewallcourses')}
          </Button>
        </div>

        <Separator className="my-0" />
      </div>
      <div className="flex flex-row gap-5 p-2 pt-0.5 pl-0">
        {dummyCourses.map((course, index) => (
          <CourseCard
            key={index}
            courseName={course.courseName}
            courseDescription={course.courseDescription}
            courseProgress={course.courseProgress}
            participantsAvatars={course.participantsAvatars}
            favorite={course.favorite}
            category={course.category}
            completedLessons={course.completedLessons}
            totalLessons={course.totalLessons}
          />
        ))}
      </div>
      <div className="flex flex-row p-2 justify-between gap-5 pl-0">
          <NextActivitiesCard activities={activities} />
          <div className="flex flex-col gap-2 max-w-[420px]">
            <CardDemo />
            <ActivityCalendar activities={activities} />
          </div>
      </div>
  </div>
  );
}