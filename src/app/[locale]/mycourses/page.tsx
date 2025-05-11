'use client'
import { CardDemo } from '@/components/dashboard/Notifications'
import { MainBreadcrumb } from '@/components/breadcrumb/MainBreadcrumb'
import {useTranslations} from 'next-intl';
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button";
import CourseCard from '@/components/courses/coursecard';
import NextActivitiesCard from "@/components/activities/nextacts";
import ActivityCalendar from '@/components/calendar/activitycalendar';
import { NavigationBar } from '@/components/navigation/navibar';
import { CourseFilters } from '@/components/courses/coursefilters';

import CourseOwnerCard from '@/components/courses/courseownercard';
import CourseCategories from '@/components/courses/collapcourses';


// Define el tipo para un elemento del breadcrumb
interface BreadcrumbItemType {
  label: string;
  href?: string; // Opcional para el último elemento que es solo texto
}

export type CourseFilterType = "all" | "owner" | "member" | "public" | "private"


const breadcrumbitems: BreadcrumbItemType[] = [
    {
        label: 'Cursos',
        href: '#',
    },
    {
        label: 'Mis Cursos',
        href: '#',
        }
]
const dummyOwnerCourses: CourseOwnerCardProps[] = [
    {
      courseName: "Programación Web Avanzada",
      courseDescription: "Aprende HTML5, CSS3, JavaScript y frameworks modernos para crear aplicaciones web interactivas y responsivas.",
      courseActivity: 75,
      studentCount: 32,
      moduleCount: 8,
      isOwner: true,
      imageUrl: "https://images.pexels.com/photos/1643409/pexels-photo-1643409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      courseName: "Inteligencia Artificial: Fundamentos",
      courseDescription: "Introducción a los algoritmos de machine learning, redes neuronales y procesamiento de lenguaje natural.",
      courseActivity: 62,
      studentCount: 45,
      moduleCount: 12,
      isOwner: true,
      imageUrl: "https://images.pexels.com/photos/1643409/pexels-photo-1643409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      courseName: "Desarrollo de Aplicaciones Móviles",
      courseDescription: "Crea aplicaciones nativas para iOS y Android utilizando React Native y Flutter.",
      courseActivity: 48,
      studentCount: 28,
      moduleCount: 10,
      isOwner: false,
      isMember: true,
      imageUrl: "https://images.pexels.com/photos/1643409/pexels-photo-1643409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      courseName: "Análisis de Datos con Python",
      courseDescription: "Aprende a utilizar bibliotecas como Pandas, NumPy y Matplotlib para analizar y visualizar datos.",
      courseActivity: 89,
      studentCount: 53,
      moduleCount: 14,
      isOwner: true,
      isMember: false,
      imageUrl: "https://images.pexels.com/photos/1643409/pexels-photo-1643409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      courseName: "Ciberseguridad para Empresas",
      courseDescription: "Estrategias y herramientas para proteger la infraestructura digital y los datos sensibles de tu organización.",
      courseActivity: 35,
      studentCount: 22,
      moduleCount: 6,
      isOwner: true,
      isMember: false,
      imageUrl: "https://images.pexels.com/photos/1643409/pexels-photo-1643409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      courseName: "Diseño UX/UI: Principios Fundamentales",
      courseDescription: "Metodologías y herramientas para crear interfaces usables, accesibles y estéticamente atractivas.",
      courseActivity: 92,
      studentCount: 38,
      moduleCount: 9,
      isOwner: false,
      isMember: true,
      imageUrl: "https://images.pexels.com/photos/1643409/pexels-photo-1643409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];



const dummyBaseOwnerCourses: OwnerCourse[] = [
  {
    id: '1',
    courseName: 'Cálculo Diferencial I',
    lastAccessed: '2025-10-01',
  },
  {
    id: '2',
    courseName: 'Métodos Numéricos I',
    lastAccessed: '2025-10-05',
  },
];
const dummyEnrolledCourses: EnrolledCourse[] = [
  {
    id: '3',
    courseName: 'Introducción a la Programación en Python',
    lastAccessed: '2025-10-10',
  },
  {
    id: '4',
    courseName: 'Fundamentos de la Programación',
    lastAccessed: '2025-10-15',
  },
  {
    id: '5',
    courseName: 'Estructuras de Datos',
    lastAccessed: '2025-10-20',
  },
  {
    id: '6',
    courseName: 'Algoritmos Avanzados',
    lastAccessed: '2025-10-25',
  },
  {
    id: '7',
    courseName: 'Bases de Datos I',
    lastAccessed: '2025-10-30',
  },
  {
    id: '8',
    courseName: 'Bases de Datos II',
    lastAccessed: '2025-11-01',
  }
];

const dummyNotEnrolledCourses: NotEnrolledCourse[] = [
  {
    id: '9',
    courseName: 'Inteligencia Artificial',
    lastAccessed: '2025-11-05',
  },
  {
    id: '10',
    courseName: 'Aprendizaje Automático',
    lastAccessed: '2025-11-10',
  },
];

const collapCoursesprops: CourseCategoriesProps = {
  ownerCourses: dummyBaseOwnerCourses,
  enrolledCourses: dummyEnrolledCourses,
  notEnrolledCourses: dummyNotEnrolledCourses,
}

export default function MyCoursesPage() {
    const t = useTranslations('MyCoursesPage');
    
    return (
        <div className="w-full mx-auto">
            <NavigationBar items={breadcrumbitems} />
            <div className="w-full">
                <Separator className="my-2" />
                <div className="flex flex-row gap-3 p-2 pt-0.5 pl-0 justify-center">
                  <div className="flex flex-col">
                    <div className="flex flex-col gap-2 p-2 pl-0 pt-0">
                        <h1 className="text-xs font-light text-slate-500 dark:text-slate-300">{t('title')}</h1>
                    </div>
                    <div className="md:grid md:grid-cols-2 gap-4 p-2 pl-0 relative">
                        {
                            dummyOwnerCourses.map((course, index) => (
                                <CourseOwnerCard {...course} key={index}/>
                            ))
                        }
                    
                    </div>
                  </div>

                  <div className="flex flex-col w-5/12 gap-2">
                    <h1 className="text-xs font-light text-slate-500 dark:text-slate-300">{t('filters')}</h1>
                    <CourseFilters defaultValue='all'className='flex'/>
                    <h1 className="text-xs font-light pb-2 text-slate-500 dark:text-slate-300">{t('categories')}</h1>
                    <CourseCategories {...collapCoursesprops} />
                  </div>

                  
                </div>
            </div>
        </div>
    )
}
