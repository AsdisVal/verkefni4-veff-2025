import Navigation from '@/components/Navigation/Navigation';
import CreateCategory from '@/components/Create/NewCategory';
import styles from '../../../page.module.css';

export default function CreateFlokk() {
  return (
    <div className={styles.page}>
      <Navigation />
      <CreateCategory title="Búa til nýjan flokk" />
    </div>
  );
}
