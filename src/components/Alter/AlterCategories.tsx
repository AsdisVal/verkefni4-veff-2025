'use client';

import { QuestionsApi } from '@/api';
import { Category, Paginated, UiState } from '@/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = {
  title: string;
  tag?: string;
  popular?: boolean;
};

export default function AlterListCategories({ title }: Props) {
  const [uiState, setUiState] = useState<UiState>('initial');
  const [categories, setCategories] = useState<Paginated<Category> | null>(
    null
  );
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      setUiState('loading');

      const api = new QuestionsApi();
      const catResponse = await api.getCategories();

      if (!catResponse) {
        setUiState('error');
      } else {
        setUiState('data');
        setCategories(catResponse);
      }
    }
    fetchData();
  }, []);

  function deleteCategory(slug: string) {
    async function deleteData() {
      const api = new QuestionsApi();
      const response = await api.fetchFromApi(`categories/${slug}`, 'DELETE');
      if (!response.success) {
        setUiState('error');
        setError(response.err);
      }
    }
    deleteData();

    setCategories((prevCategories: Paginated<Category> | null) => {
      if (!prevCategories) return prevCategories;
      const newCategories = prevCategories.data.filter(
        (cat) => cat.slug !== slug
      );
      return { ...prevCategories, data: newCategories };
    });
  }
  function deleteFactory(slug: string) {
    return () => deleteCategory(slug);
  }

  return (
    <div>
      <h2>{title}</h2>

      {uiState === 'loading' && <p>Sæki flokka</p>}
      {uiState === 'error' && !error && <p>Villa við að ná í flokka</p>}
      {uiState === 'error' && error && (
        <p>Villa við að eyða flokki: {`${error}`}</p>
      )}
      {uiState === 'data' && (
        <ul>
          {categories?.data.map((category, index) => (
            <li key={index}>
              <p>{category.name}</p>
              <Link href={`/flokkar/breyta/${category.slug}`}>Breyta</Link>
              <button onClick={deleteFactory(category.slug)}>Eyða</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
