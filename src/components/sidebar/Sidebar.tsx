'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, User, School, LogOut, Settings, BookOpenCheck, Backpack, Presentation, LayoutDashboard, GraduationCap } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { cn } from '@/lib/utils';

type NavigationItem = {
  name: string;
  icon: React.ReactNode;
  href: string;
};

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const t = useTranslations('Sidebar');

  const navigation: NavigationItem[] = [
    { name: t('mycourses'), icon: <School />, href: '/mycourses' },
    { name: t('myevaluations'), icon: <BookOpenCheck />, href: '#' },
    { name: t('myhomeworks'), icon: <Backpack />, href: '#' },
    { name: t('myprojects'), icon: <Presentation />, href: '#' },
    { name: t('myapps'), icon: <LayoutDashboard />, href: '#' },
    { name: t('learnresources'), icon: <GraduationCap />, href: '#' },
  ];

  return (
    <div className={cn(
      "relative h-screen bg-gray-800 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Botón de colapso */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 rounded-full bg-gray-800 p-1.5 text-white shadow-lg hover:bg-gray-700"
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {/* Contenido de la sidebar */}
      <div className="flex h-full flex-col justify-between">
        {/* Elementos de navegación */}

        <nav className="mt-8 space-y-2 px-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center rounded-md p-3 text-gray-300 hover:bg-gray-700"
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="flex-shrink-0">{item.icon}</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm font-medium text-gray-100 dark:text-gray-900">
                      {item.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {!isCollapsed && (
                <span className="ml-3 overflow-hidden transition-all">
                  {item.name}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Área del usuario */}
        <div className="border-t border-gray-700 p-4">

          <div className="relative">
            <button
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              className="flex w-full items-center gap-x-3 rounded-md p-2 hover:bg-gray-700 justify-center"
            >
              <Avatar>
                <AvatarImage
                  src="https://avatars.githubusercontent.com/u/70881259?v=4"
                  alt="User avatar"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="text-left">
                  <p className="text-sm font-medium text-white">John Doe</p>
                  <p className="text-xs text-gray-400">john@example.com</p>
                </div>
              )}
            </button>

            {/* Popover del perfil */}
            {isPopoverOpen && (
              <div className={cn(
                "absolute bottom-full left-0 mb-2 w-full rounded-md bg-white shadow-lg",
                isCollapsed ? "left-12" : "left-0"
              )}>
                <div className="p-2">
                  <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <User size={16} />
                    <span>Perfil</span>
                  </button>
                  <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Settings size={16} />
                    <span>Configuración</span>
                  </button>
                  <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                    <LogOut size={16} />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}