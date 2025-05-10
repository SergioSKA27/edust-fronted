'use client'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Book, FileText, FileQuestion, Calendar } from "lucide-react";
import { useTranslations } from 'next-intl';



interface NextActivitiesCardProps {
    activities: Activity[];
}

export default function NextActivitiesCard({ activities }: NextActivitiesCardProps) {
    const t = useTranslations('Activities');
    
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
    
    // Función para obtener la etiqueta del tipo de actividad
    const getActivityTypeLabel = (type: ActivityType) => {
        switch(type) {
            case 'lesson':
                return t('lesson');
            case 'assignment':
                return t('assignment');
            case 'exam':
                return t('exam');
            default:
                return t('activity');
        }
    };
    
    return (
        <Card className="w-full rounded-3xl border-gray-300 p-5  dark:bg-slate-900 dark:border-slate-700 max-h-[650px]">
            <CardHeader className="flex flex-row justify-between items-center pb-2">
                <CardTitle className="text-2xl font-bold">{t('myNextActivities')}</CardTitle>
                <a href="#" className="text-orange-500 hover:underline">{t('viewAll')}</a>
            </CardHeader>
            
            <CardContent className="p-0">
                <div className="grid grid-cols-3 text-sm font-medium text-gray-500 px-6 py-2">
                    <div>{t('activity')}</div>
                    <div>{t('teacher')}</div>
                    <div className="text-right">{t('duration')}</div>
                </div>
                
                <div className="divide-y max-h-[500px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600">
                    {activities.map((activity) => (
                        <div key={activity.id} className="px-2 py-4 hover:bg-gray-50 transition-colors dark:hover:bg-gray-800">
                            <div className="grid grid-cols-3 items-center">
                                <div className="space-y-1">
                                    <div className="font-medium">
                                        {activity.number}. {activity.title}
                                    </div>
                                    <div className="text-sm text-gray-500 flex items-center">
                                        {getActivityIcon(activity.type)}
                                        {activity.subtitle}
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={activity.instructor.avatar} alt={activity.instructor.name} />
                                        <AvatarFallback>{activity.instructor.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span>{activity.instructor.name}</span>
                                </div>
                                
                                <div className="text-right">{activity.duration}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}