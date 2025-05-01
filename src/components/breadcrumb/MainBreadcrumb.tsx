import React from "react";
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Define el tipo para un elemento del breadcrumb
interface BreadcrumbItemType {
    label: string;
    href?: string; // Opcional para el último elemento que es solo texto
}

interface BreadcrumbDemoProps {
    items: BreadcrumbItemType[];
}

export function MainBreadcrumb({ items = [] }: BreadcrumbDemoProps) {
    // Solo mostrar dropdown si hay más de 5 elementos
    const showDropdown = items.length > 5;
    
    // Crear la lista de elementos a renderizar
    const renderedItems: React.ReactNode[] = [];
    
    items.forEach((item, index) => {
        const isLastItem = index === items.length - 1;
        
        // Determinar si debemos mostrar este elemento o esconderlo en el dropdown
        // Siempre mostrar si no hay dropdown, o si es uno de los 2 primeros o 2 últimos elementos
        const shouldShow = !showDropdown || index < 2 || index > items.length - 3;
        
        // Si este elemento debe mostrarse en el breadcrumb principal
        if (shouldShow) {
            // Añadir el elemento del breadcrumb
            renderedItems.push(
                <BreadcrumbItem key={`item-${index}`}>
                    {isLastItem ? (
                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                        <BreadcrumbLink href={item.href || '#'}>{item.label}</BreadcrumbLink>
                    )}
                </BreadcrumbItem>
            );
            
            // Añadir separador si no es el último elemento
            if (!isLastItem) {
                renderedItems.push(<BreadcrumbSeparator key={`sep-${index}`} />);
            }
            
            // Añadir dropdown después del segundo elemento
            if (showDropdown && index === 1) {
                const dropdownItems = items.slice(2, items.length - 2);
                
                renderedItems.push(
                    <BreadcrumbItem key="dropdown">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1">
                                <BreadcrumbEllipsis className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                {dropdownItems.map((dropItem, dropIndex) => (
                                    <DropdownMenuItem key={`drop-${dropIndex}`}>
                                        {dropItem.href ? (
                                            <a href={dropItem.href}>{dropItem.label}</a>
                                        ) : (
                                            dropItem.label
                                        )}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </BreadcrumbItem>
                );
                
                renderedItems.push(<BreadcrumbSeparator key="sep-dropdown" />);
            }
        }
    });

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {renderedItems}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
