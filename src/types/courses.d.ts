interface CourseBase {
    id: string;
    courseName: string;
    lastAccessed?: string;
    private?: boolean;
}

interface OwnerCourse extends CourseBase {}
interface EnrolledCourse extends CourseBase {}
interface NotEnrolledCourse extends CourseBase {}

interface CourseOwnerCardProps {
    courseName: string;
    courseDescription: string;
    courseActivity: number;
    studentCount: number;
    moduleCount: number;
    isOwner?: boolean;
    isMember?: boolean;
    imageUrl: string;
    onManage?: () => void;
    onStats?: () => void;
    onEdit?: () => void;
    onSettings?: () => void;
}

interface CourseCategoriesProps {
    ownerCourses: OwnerCourse[];
    enrolledCourses: EnrolledCourse[];
    notEnrolledCourses: NotEnrolledCourse[];
}

