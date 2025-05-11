"use client"

import * as React from "react"
import { useTranslations } from 'next-intl'
import { Toggle } from "@/components/ui/toggle"
import { GridIcon, User2Icon, UsersIcon, GlobeIcon, LockIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export type CourseFilterType = "all" | "owner" | "member" | "public" | "private"

interface CourseFiltersProps {
  onFilterChange?: (values: CourseFilterType[]) => void
  defaultValue?: CourseFilterType
  className?: string
}

export function CourseFilters({ 
  onFilterChange,
  defaultValue = "all",
  className
}: CourseFiltersProps) {
  const t = useTranslations('CourseFilters')
  const [activeFilters, setActiveFilters] = React.useState<CourseFilterType[]>([defaultValue])
  
  const handleToggleChange = (value: CourseFilterType, pressed: boolean) => {
    let newFilters: CourseFilterType[] = [...activeFilters]
    
    if (value === "all") {
      // If "all" is being activated, deselect everything else
      newFilters = pressed ? ["all"] : []
    } else {
      // Handle non-"all" filters
      if (pressed) {
        // Add the filter, remove "all" if present
        newFilters = newFilters.filter(f => f !== "all")
        if (!newFilters.includes(value)) {
          newFilters.push(value)
        }
      } else {
        // Remove the filter
        newFilters = newFilters.filter(f => f !== value)
      }
      
      // If no filters are selected, default to "all"
      if (newFilters.length === 0) {
        newFilters = ["all"]
      }
    }
    
    setActiveFilters(newFilters)
    if (onFilterChange) {
      onFilterChange(newFilters)
    }
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <Toggle
        size="sm"
        variant="outline"
        pressed={activeFilters.includes("all")}
        onPressedChange={(pressed) => handleToggleChange("all", pressed)}
        aria-label={t('all') || "All courses"}
        className={cn(
          "transition-all duration-200",
          activeFilters.includes("all") 
            ? "border-primary bg-primary/10 text-primary shadow-sm" 
            : "hover:border-primary/50 hover:text-primary"
        )}
      >
        <GridIcon className="mr-1" size={14} />
        <span className="text-xs">{t('all') || "All"}</span>
      </Toggle>
      
      <Toggle
        size="sm"
        variant="outline"
        pressed={activeFilters.includes("owner")}
        onPressedChange={(pressed) => handleToggleChange("owner", pressed)}
        aria-label={t('owner') || "Courses you own"}
        className={cn(
          "transition-all duration-200",
          activeFilters.includes("owner") 
            ? "border-[--chart-1] bg-[--chart-1]/10 text-[--chart-1] shadow-sm" 
            : "hover:border-[--chart-1]/50 hover:text-[--chart-1]"
        )}
      >
        <User2Icon className="mr-1" size={14} />
        <span className="text-xs">{t('owner') || "Owner"}</span>
      </Toggle>
      
      <Toggle
        size="sm"
        variant="outline"
        pressed={activeFilters.includes("member")}
        onPressedChange={(pressed) => handleToggleChange("member", pressed)}
        aria-label={t('member') || "Courses you're a member of"}
        className={cn(
          "transition-all duration-200",
          activeFilters.includes("member") 
            ? "border-[--chart-2] bg-[--chart-2]/10 text-[--chart-2] shadow-sm" 
            : "hover:border-[--chart-2]/50 hover:text-[--chart-2]"
        )}
      >
        <UsersIcon className="mr-1" size={14} />
        <span className="text-xs">{t('member') || "Member"}</span>
      </Toggle>
      
      <Toggle
        size="sm"
        variant="outline"
        pressed={activeFilters.includes("public")}
        onPressedChange={(pressed) => handleToggleChange("public", pressed)}
        aria-label={t('public') || "Public courses"}
        className={cn(
          "transition-all duration-200",
          activeFilters.includes("public") 
            ? "border-[--chart-4] bg-[--chart-4]/10 text-[--chart-4] shadow-sm" 
            : "hover:border-[--chart-4]/50 hover:text-[--chart-4]"
        )}
      >
        <GlobeIcon className="mr-1" size={14} />
        <span className="text-xs">{t('public') || "Public"}</span>
      </Toggle>
      
      <Toggle
        size="sm" 
        variant="outline"
        pressed={activeFilters.includes("private")}
        onPressedChange={(pressed) => handleToggleChange("private", pressed)}
        aria-label={t('private') || "Private courses"}
        className={cn(
          "transition-all duration-200",
          activeFilters.includes("private") 
            ? "border-[--chart-5] bg-[--chart-5]/10 text-[--chart-5] shadow-sm" 
            : "hover:border-[--chart-5]/50 hover:text-[--chart-5]"
        )}
      >
        <LockIcon className="mr-1" size={14} />
        <span className="text-xs">{t('private') || "Private"}</span>
      </Toggle>
    </div>
  )
}