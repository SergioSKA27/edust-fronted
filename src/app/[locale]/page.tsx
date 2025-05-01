import { Button } from '@/components/ui/button'
import {useTranslations} from 'next-intl';

export default function Home() {
  const t = useTranslations('Home');
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Sistema de Temas con TS</h1>
      <div className="mt-6 space-y-4">
        <Button>
          {t('button1')}
        </Button>
        <button className="px-6 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80">
          {t('button2')}
        </button>
      </div>
    </div>
  );
}