import Navigation from '@/components/Navigation/Navigation';
import EditList from '@/components/Edit/EditCategories.tsx';
import Link from 'next/link';
import styles from '../../page.module.css';

export default async function MargirFlokkar() {
  return (
    <div className={styles.page}>
      <Navigation />
      <EditList title="Breyta flokkum" />
      <Link href="/flokkar/breyta/add">Bæta við nýjum flokk</Link>
    </div>
  );
}
