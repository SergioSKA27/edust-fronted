type ActivityType = 'lesson' | 'assignment' | 'exam' | 'other';

// Interfaz para una actividad
interface Activity {
    id: string;
    number: string; // Número de la actividad, ej: "01", "05"
    type: ActivityType;
    title: string;
    subtitle: string;
    instructor: {
        name: string;
        avatar: string;
    };
    duration: string; // Ej: "22 min", "1h 08 min"
    date?: string | Date; // Fecha de la actividad, opcional
}