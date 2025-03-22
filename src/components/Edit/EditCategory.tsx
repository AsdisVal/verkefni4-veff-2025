'use client';

import { QuestionsApi } from '@/api';
import { UiState } from '@/types';
import { useEffect, useState } from 'react';
import CategoryForm from '../Create/Form.tsx';
import { Category } from '@/types';

type Props = {
  title: string;
  slug: string;
  tag?: string;
  popular?: boolean;
};

export default function EditSingular({ title, slug }: Props) {
  const [uiState, setUiState] = useState<UiState>('loading');
  const [category, setCategory] = useState<Category | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      setUiState('loading');
      const api = new QuestionsApi();
      const response = await api.getCategory(slug);

      if (!response) {
        setUiState('error');
        return;
      }
      console.log(response);
      setUiState('initial');
      setCategory(response);
    }
    fetchData();
  }, [slug]);

  function onSubmit(title: string) {
    async function fetchData() {
      setUiState('loading');
      const api = new QuestionsApi();
      const response = await api.updateCategory(slug, title);

      if (typeof response === 'string') {
        setUiState('error');
        setError(response);
        return;
      }
      setUiState('data');
    }
    fetchData();
  }

  return (
    <div>
      <h2>{title}</h2>
      {uiState === 'loading' && <p>loading...</p>}
      {uiState === 'data' && <p>Flokkur uppfærður!</p>}
      {uiState === 'error' && !error && <p>Villa við að ná í flokk</p>}
      {uiState === 'error' && error && (
        <p>Villa við að uppfæra flokk: {`${error}`}</p>
      )}
      {uiState === 'initial' && (
        <CategoryForm title={category?.name} onSubmit={onSubmit} />
      )}
    </div>
  );
}
