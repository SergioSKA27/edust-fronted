'use client'
import { BellRing, Check, X, ChevronRight, ChevronLeft, ExternalLink, Trash } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useTranslations } from 'next-intl';

// Tipo para las notificaciones
type Notification = {
  title: string;
  description: string;
  url?: string; // URL opcional para redirección
}

// Datos de ejemplo
const initialNotifications: Notification[] = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
    url: "https://example.com/messages"
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
    url: "https://example.com/subscription"
  },
]

type CardProps = React.ComponentProps<typeof Card>

export function CardDemo({ className, ...props }: CardProps) {
  const t = useTranslations('Notificationsdashboard');
  // Estado para las notificaciones y el índice actual
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Verificar si hay notificaciones
  const hasNotifications = notifications.length > 0;
  const currentNotification = hasNotifications ? notifications[currentIndex] : null;

  // Función para descartar la notificación actual
  const dismissNotification = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation(); // Evitar que el click llegue al div clickeable
    }
    const newNotifications = [...notifications];
    newNotifications.splice(currentIndex, 1);
    setNotifications(newNotifications);
    
    // Ajustar el índice si es necesario
    if (currentIndex >= newNotifications.length && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Función para navegar a la notificación anterior
  const prevNotification = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Función para navegar a la siguiente notificación
  const nextNotification = () => {
    if (currentIndex < notifications.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Función para manejar el clic en una notificación con enlace
  const handleNotificationClick = () => {
    if (currentNotification?.url) {
      window.open(currentNotification.url, '_blank');
    }
  };

  // Función para descartar todas las notificaciones
  const dismissAllNotifications = () => {
    setNotifications([]);
    setCurrentIndex(0);
  };

  return (
    <Card className={cn("w-full h-[250px]", className)} {...props}>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>
            {t("nonread")} {hasNotifications ? `(${notifications.length})` : '(0)'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col h-[100px]">
        {hasNotifications ? (
          <>
            <div className="flex flex-1 items-center">
              <div 
                className={cn(
                  "flex-1 p-4 rounded-lg transition-all",
                  currentNotification?.url ? "cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800" : ""
                )}
                onClick={handleNotificationClick}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-sky-500" /> 
                    <p className="text-sm font-medium leading-none">
                      {currentNotification?.title}
                      {currentNotification?.url && <ExternalLink className="inline ml-2 h-3 w-3" />}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {currentNotification?.description}
                  </p>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-2" 
                onClick={(e) => dismissNotification(e)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-center text-muted-foreground">
              No hay notificaciones pendientes
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={dismissAllNotifications}
          disabled={!hasNotifications}
          className="w-full"
        >
          <Trash className="mr-2 h-4 w-4" /> {t("markallasread")}
        </Button>
      </CardFooter>
    </Card>
  )
}
