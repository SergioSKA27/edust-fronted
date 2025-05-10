'use client'

import { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, isSameDay } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Book, FileText, FileQuestion, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Tipo de actividad
export type ActivityType = 'lesson' | 'assignment' | 'exam' | 'other';


interface ActivityCalendarProps {
    activities: Activity[];
}

export default function ActivityCalendar({ activities }: ActivityCalendarProps) {
    const t = useTranslations('Calendar');
    const locale = useLocale();
    const dateLocale = locale === 'es' ? es : enUS;
    
    const [currentDate, setCurrentDate] = useState(new Date());
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    
    // Función para obtener el icono según el tipo de actividad
    const getActivityIcon = (type: ActivityType) => {
        switch(type) {
            case 'lesson':
                return <Book className="w-4 h-4 mr-2 text-blue-500" />;
            case 'assignment':
                return <FileText className="w-4 h-4 mr-2 text-green-500" />;
            case 'exam':
                return <FileQuestion className="w-4 h-4 mr-2 text-red-500" />;
            default:
                return <Calendar className="w-4 h-4 mr-2 text-gray-500" />;
        }
    };
    
    // Función para verificar si un día tiene actividades
    const hasActivities = (day: Date) => {
        return activities.some(activity => 
            isSameDay(new Date(activity.date ? activity.date : Date.now()), day)
        );
    };
    
    // Función para obtener las actividades de un día específico
    const getActivitiesForDay = (day: Date) => {
        return activities.filter(activity => 
            isSameDay(new Date(activity.date ? activity.date : Date.now()), day)
        );
    };
    
    // Función para obtener el estilo de la actividad por tipo
    const getDotStyleByType = (type: ActivityType) => {
        switch(type) {
            case 'lesson':
                return 'bg-blue-500';
            case 'assignment':
                return 'bg-green-500';
            case 'exam':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    // Función para obtener todos los tipos de actividades para un día
    const getActivityTypesForDay = (day: Date) => {
        return [...new Set(getActivitiesForDay(day).map(a => a.type))];
    };
    
    return (
        <div className="w-full rounded-xl border border-gray-300 p-3 sm:p-6 dark:bg-slate-900 dark:border-slate-700 ">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
                <h2 className="text-lg sm:text-md font-bold">{t('activities')}</h2>
                <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={prevMonth}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center px-1 font-medium sm:text-base overflow-hidden whitespace-nowrap text-ellipsis w-28 justify-center">
                        <p className="text-sm">
                            {format(currentDate, 'MMMM yyyy', { locale: dateLocale })}
                        </p>
                    </div>
                    <Button variant="outline" size="icon" onClick={nextMonth}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="font-medium text-xs sm:text-sm text-gray-500 py-1 sm:py-2">
                        {t(day.toLowerCase())}
                    </div>
                ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {daysInMonth.map((day, index) => {
                    const dayActivities = getActivitiesForDay(day);
                    const activityTypes = getActivityTypesForDay(day);
                    
                    return (
                        <HoverCard key={day.toString()} openDelay={300} closeDelay={200}>
                            <HoverCardTrigger asChild>
                                <button 
                                    className={`
                                        aspect-square w-full flex flex-col items-center justify-center rounded-lg relative
                                        ${!isSameMonth(day, currentDate) ? 'text-gray-400' : ''}
                                        ${isToday(day) ? 'bg-blue-100 font-bold dark:bg-blue-900/30' : ''}
                                        ${hasActivities(day) && !isToday(day) ? 'font-medium' : ''}
                                        hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
                                        text-xs sm:text-sm md:text-base
                                    `}
                                >
                                    {format(day, 'd')}
                                    
                                    {activityTypes.length > 0 && (
                                        <div className="flex gap-0.5 sm:gap-1 mt-0.5 sm:mt-1">
                                            {activityTypes.slice(0, 3).map((type) => (
                                                <div 
                                                    key={type} 
                                                    className={`h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full ${getDotStyleByType(type)}`}
                                                />
                                            ))}
                                            {activityTypes.length > 3 && (
                                                <div className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-gray-400" />
                                            )}
                                        </div>
                                    )}
                                </button>
                            </HoverCardTrigger>
                            
                            {dayActivities.length > 0 && (
                                <HoverCardContent className="w-[calc(100vw-40px)] sm:w-80 p-0" align="start">
                                    <div className="p-2 sm:p-3 border-b">
                                        <h3 className="font-medium text-sm sm:text-base">
                                            {format(day, 'EEEE, d MMMM', { locale: dateLocale })}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-500">
                                            {dayActivities.length} {dayActivities.length === 1 
                                                ? t('activity') 
                                                : t('activities')}
                                        </p>
                                    </div>
                                    <div className="divide-y max-h-48 sm:max-h-72 overflow-auto">
                                        {dayActivities.map((activity) => (
                                            <div key={activity.id} className="p-2 sm:p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                                                <div className="flex items-center">
                                                    {getActivityIcon(activity.type)}
                                                    <span className="font-medium text-xs sm:text-sm">{activity.title}</span>
                                                </div>
                                                <div className="mt-1 flex justify-between items-center">
                                                    <div className="flex items-center space-x-1 sm:space-x-2">
                                                        <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                                                            <AvatarImage src={activity.instructor.avatar} alt={activity.instructor.name} />
                                                            <AvatarFallback>{activity.instructor.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-xs text-gray-500">{activity.instructor.name}</span>
                                                    </div>
                                                    <span className="text-xs">{activity.duration}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </HoverCardContent>
                            )}
                        </HoverCard>
                    );
                })}
            </div>
        </div>
    );
}