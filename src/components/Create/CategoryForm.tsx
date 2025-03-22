import { useState } from 'react';
import styles from './CategoryForm.module.css';

type Props = {
  title?: string;
  onSubmit: (title: string) => void;
};

export default function CategoryForm({ title = '', onSubmit }: Props) {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formTitle, setFormTitle] = useState<string>(title);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitted(true);
    onSubmit(formTitle);
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { value } = event.target;
    setFormTitle(value);
  }

  return (
    <div>
      {submitted && title && <p>Flokkur uppfærður</p>}
      {submitted && !title && <p>Flokkur búinn til</p>}
      {!submitted && (
        <form onSubmit={handleSubmit} className={styles.slay}>
          <input
            type="text"
            name="title"
            value={formTitle ?? ''}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}
