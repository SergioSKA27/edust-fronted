'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ChevronRight, ChevronDown, Crown, BookOpen, Lock, Globe, Users, Clock } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'






// Simple course item component for all course types
function CourseItem({ course, onClick }: { course: CourseBase, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="flex justify-between items-center p-3 bg-white dark:bg-slate-500 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-gray-100 dark:border-slate-700"
    >
      <span className="font-medium text-gray-800 dark:text-gray-200 overflow-hidden">{course.courseName}</span>
      {course.lastAccessed && (
        <div className="flex items-center text- text-gray-500 dark:text-gray-400 min-w-20">
          <Clock className="h-3.5 w-3.5 mr-1" />
          <span className='text-xs'>{course.lastAccessed}</span>
        </div>
      )}
    </div>
  );
}

export default function CourseCategories({
  ownerCourses = [],
  enrolledCourses = [],
  notEnrolledCourses = [],
}: Partial<CourseCategoriesProps>) {
  const t = useTranslations('CourseCategories');
  const router = useRouter();
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    owner: true,
    enrolled: false,
    notEnrolled: false,
    private: false,
    public: false
  });

  const toggleCategory = (category: string) => {
    setOpenCategories({
      ...openCategories,
      [category]: !openCategories[category]
    });
  };

  const navigateToCourse = (courseId: string) => {
    router.push(`/courses/${courseId}`);
  };

  return (
    <div className="space-y-4 w-full max-w-3/11">
      {/* Owner Courses */}
      <Collapsible open={openCategories.owner} onOpenChange={() => toggleCategory('owner')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-indigo-50 dark:bg-slate-800 rounded-lg hover:bg-indigo-100 dark:hover:bg-slate-700 transition-colors">
          <div className="flex items-center space-x-3">
            <Crown className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-md font-semibold text-gray-800 dark:text-gray-100">{t('ownerCourses')}</h2>
            <Badge variant="outline" className="bg-indigo-100 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 border-indigo-200">
              {ownerCourses?.length || 0}
            </Badge>
          </div>
          {openCategories.owner ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-3 pl-5 max-h-56 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600">
          {ownerCourses && ownerCourses.length > 0 ? (
            ownerCourses.map((course) => (
              <CourseItem 
                key={course.id} 
                course={course} 
                onClick={() => navigateToCourse(course.id)} 
              />
            ))
          ) : (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400">
              {t('noOwnerCourses')}
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>

      {/* Enrolled Courses */}
      <Collapsible open={openCategories.enrolled} onOpenChange={() => toggleCategory('enrolled')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-green-50 dark:bg-slate-800 rounded-lg hover:bg-green-100 dark:hover:bg-slate-700 transition-colors">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-4 w-4 text-green-600 dark:text-green-400" />
            <h2 className="text-md font-semibold text-gray-800 dark:text-gray-100">{t('enrolledCourses')}</h2>
            <Badge variant="outline" className="bg-green-100 dark:bg-slate-700 text-green-600 dark:text-green-400 border-green-200">
              {enrolledCourses?.length || 0}
            </Badge>
          </div>
          {openCategories.enrolled ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-3 pl-5 max-h-56 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600">
          {enrolledCourses && enrolledCourses.length > 0 ? (
            enrolledCourses.map((course) => (
              <CourseItem 
                key={course.id} 
                course={course} 
                onClick={() => navigateToCourse(course.id)} 
              />
            ))
          ) : (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400">
              {t('noEnrolledCourses')}
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>

      {/* Not Enrolled Courses */}
      <Collapsible open={openCategories.notEnrolled} onOpenChange={() => toggleCategory('notEnrolled')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-blue-50 dark:bg-slate-800 rounded-lg hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors">
          <div className="flex items-center space-x-3">
            <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-md font-semibold text-gray-800 dark:text-gray-100">{t('notEnrolledCourses')}</h2>
            <Badge variant="outline" className="bg-blue-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400 border-blue-200">
              {notEnrolledCourses?.length || 0}
            </Badge>
          </div>
          {openCategories.notEnrolled ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-3 pl-5 max-h-56 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600">
          {notEnrolledCourses && notEnrolledCourses.length > 0 ? (
            notEnrolledCourses.map((course) => (
              <CourseItem 
                key={course.id} 
                course={course} 
                onClick={() => navigateToCourse(course.id)} 
              />
            ))
          ) : (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400">
              {t('noAvailableCourses')}
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>

    </div>
  );
}