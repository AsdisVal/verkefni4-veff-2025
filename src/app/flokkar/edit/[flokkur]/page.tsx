import Navigation from '@/components/Navigation/Navigation';
import EditSingular from '@/components/Edit/EditCategory';
import styles from '../../../page.module.css';

export default async function BreytaFlokk({
  params,
}: {
  params: Promise<{ flokkur: string }>;
}) {
  const { flokkur } = await params;

  return (
    <div className={styles.page}>
      <Navigation />
      <EditSingular slug={flokkur} title={`Breyta ${flokkur}`} />
    </div>
  );
}
