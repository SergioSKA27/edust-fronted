'use client'

import {
    Card,
    CardTitle,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button";
import { Pencil, Settings, Users, BookOpen, BarChart } from "lucide-react";
import { useTranslations } from 'next-intl';


export default function CourseOwnerCard({
    courseName,
    courseDescription,
    courseActivity = 75,
    studentCount = 32,
    moduleCount = 8,
    isOwner = true,
    isMember = false, // Nueva prop para indicar si es miembro
    imageUrl = "/api/placeholder/400/200",
    onManage,
    onStats,
    onEdit,
    onSettings
}: CourseOwnerCardProps) {
    const t = useTranslations('Coursecard');
    
    return (
        <Card className="w-full overflow-hidden rounded-xl shadow-md dark:bg-slate-900 relative">
            {/* Imagen de fondo que cubre toda la tarjeta */}
            <div className="absolute inset-0 w-full h-42">
                <img src={imageUrl} alt={courseName} className="w-full h-42 object-cover" />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-slate-900 to-transparent"></div>
            </div>
            
            {/* Badge condicional */}
            {isOwner ? (
                <span className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                    {t("owner") || "Owner"}
                </span>
            ) : isMember ? (
                <span className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                    {t("member") || "Member"}
                </span>
            ) : null}
            
            {/* Contenido de la tarjeta con posición relativa para superponerse sobre la imagen */}
            <div className="relative z-10 p-3 pt-22 pb-2 text-white">
                <div className="flex justify-between items-start mb-1">
                    <CardTitle className="text-lg font-bold text-white h-14 overflow-y-hidden">{courseName}</CardTitle>
                    {
                        isOwner && (
                            <div className="flex space-x-2">
                                <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/20" onClick={onEdit}>
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/20" onClick={onSettings}>
                                    <Settings className="h-4 w-4" />
                                </Button>
                            </div>
                        )
                    }
                </div>
                
                <p className="text-white/80 mb-4 line-clamp-2 text-xs">{courseDescription}</p>
                
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <Users className="text-white/70 mr-2 h-4 w-4" />
                        <span className="text-white/90">{studentCount} {t("students") || "students"}</span>
                    </div>
                    <div className="flex items-center">
                        <BookOpen className="text-white/70 mr-2 h-4 w-4" />
                        <span className="text-white/90">{moduleCount} {t("modules") || "modules"}</span>
                    </div>
                </div>
                
                <div className="mb-4">
                    <div className="flex justify-between mb-1">
                        <span className="text-sm text-white/90">{t("courseactivity") || "Course activity"}</span>
                        <span className="text-sm font-medium text-white">{courseActivity}%</span>
                    </div>
                    <Progress value={courseActivity} max={100} className="h-2 bg-white/20 rounded-full">
                        <div className="bg-indigo-500 h-full rounded-full" style={{width: `${courseActivity}%`}}></div>
                    </Progress>
                </div>
                
                <div className="flex space-x-2">
                    <Button 
                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg flex-1 flex justify-center items-center"
                        onClick={onManage}
                    >
                        <Users className="mr-2 h-4 w-4" />
                        <span>{t("manage") || "Manage"}</span>
                    </Button>
                    <Button 
                        variant="secondary" 
                        className="bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg"
                        onClick={onStats}
                    >
                        <BarChart className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </Card>
    );
}