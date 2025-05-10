'use client'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bookmark } from "lucide-react";
import { useTranslations } from 'next-intl';

interface CourseCardProps {
    courseName: string;
    courseDescription: string;
    courseProgress: number;
    participantsAvatars: string[];
    favorite: boolean;
    category: string;
    completedLessons: number;
    totalLessons: number;
}

export default function CourseCard({
    courseName,
    courseProgress,
    participantsAvatars,
    favorite,
    category,
    completedLessons,
    totalLessons,
}: CourseCardProps) {
    const t = useTranslations('Coursecard');
    
    // Mostrar solo los primeros 3 avatares
    const visibleAvatars = participantsAvatars.slice(0, 3);
    const remainingParticipants = participantsAvatars.length > 3 ? participantsAvatars.length - 3 : 0;
    
    return (
        <Card className="w-full p-4 rounded-xl dark:bg-slate-900 max-w-[400px]">
            <div className="flex justify-between items-start mb-2">
                <Button variant="secondary" size="sm" className="rounded-full px-3 py-1 h-auto bg-slate-800 text-white hover:bg-slate-700">
                    {category}
                </Button>
                <Button variant="ghost" size="icon" className="p-0" onClick={() => {}}>
                    <Bookmark className={`h-5 w-5 ${favorite ? 'fill-current' : ''}`} />
                </Button>
            </div>
            
            <CardHeader className="px-0 pt-0 h-12 flex items-center">
                <CardTitle className="text-xl font-bold">{courseName}</CardTitle>
            </CardHeader>
            
            <CardContent className="px-0 space-y-4">
                <div className="space-y-1">
                    <div className="flex justify-between items-center text-sm">
                        <span>{t("progress")}</span>
                        <span>{completedLessons}/{totalLessons} {t("lessons")}</span>
                    </div>
                    <Progress value={courseProgress} max={100} className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full" />
                </div>
                
                <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
                        {visibleAvatars.map((avatar, index) => (
                            <Avatar key={index} className="border-2 border-amber-200 w-8 h-8">
                                <AvatarImage src={avatar} alt={`Participant ${index + 1}`} />
                                <AvatarFallback>?</AvatarFallback>
                            </Avatar>
                        ))}
                        {remainingParticipants > 0 && (
                            <div className="w-8 h-8 rounded-full bg-amber-300 flex items-center justify-center text-xs font-medium border-2 border-amber-200">
                                +{remainingParticipants}
                            </div>
                        )}
                    </div>
                    
                    <Button 
                        className="bg-slate-800 dark:bg-slate-700 text-white hover:bg-slate-400 rounded-full px-4 py-2 dark:hover:bg-slate-600"
                    >
                        {t("viewcourse")}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

