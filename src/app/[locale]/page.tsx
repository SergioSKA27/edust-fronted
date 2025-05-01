import { CardDemo } from '@/components/dashboard/Notifications'
import { MainBreadcrumb } from '@/components/breadcrumb/MainBreadcrumb'
import {useTranslations} from 'next-intl';



// Define el tipo para un elemento del breadcrumb
interface BreadcrumbItemType {
  label: string;
  href?: string; // Opcional para el último elemento que es solo texto
}
const breadcrumbHome: BreadcrumbItemType = {
  label: 'Inicio',
  href: '#',
}

const breadcrumbDashboard: BreadcrumbItemType = {
  label: 'Dashboard',
  href: '#',
}




export default function Home() {
  const t = useTranslations('Home');
  return (
    <div className="w-full mx-auto">
      <MainBreadcrumb
        items={[
          breadcrumbHome,
          breadcrumbDashboard
        ]}
      />
      <div className="flex flex-row p-5 justify-between">
        <div className="flex">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Bienvenido Username!
          </h1>
        </div>
        <div className="flex justify-end">
          <CardDemo />
        </div>
      </div>
  </div>
  );
}