import Navigation from '@/components/Navigation/Navigation';
import EditCategoriesList from '@/components/Edit/EditCategories.tsx';
import Link from 'next/link';
import styles from '../../page.module.css';

export default async function MargirFlokkar() {
  return (
    <div className={styles.page}>
      <Navigation />
      <EditCategoriesList title="Breyta flokkum" />
      <Link href="/flokkar/edit/add">Bæta við nýjum flokki!</Link>
    </div>
  );
}
