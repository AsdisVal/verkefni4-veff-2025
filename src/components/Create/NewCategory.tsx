'use client';

import CategoryForm from './Form.tsx';
import { useState } from 'react';
import { UiState } from '@/types';
import { QuestionsApi } from '@/api';

export default function CreateCategory({ title }: { title: string }) {
  const [uiState, setUiState] = useState<UiState>('initial');
  const [error, setError] = useState<string | undefined>(undefined);

  function onSubmit(title: string) {
    async function fetchData() {
      setUiState('loading');
      const api = new QuestionsApi();
      const response = await api.createCategory(title);

      if (typeof response === 'string') {
        setUiState('error');
        setError(response as string);
        return;
      }
      setUiState('data');
    }
    fetchData();
  }

  return (
    <div>
      <h2>{title}</h2>
      {uiState === 'loading' && <p>flokkur að bætast í safnið...</p>}
      {uiState === 'data' && <p>Flokki var bætt í safnið þökk sé þér!</p>}
      {uiState === 'error' && error && (
        <p>Villa við að bæta við flokk: {`${error}`}</p>
      )}
      {uiState === 'initial' && <CategoryForm onSubmit={onSubmit} />}
    </div>
  );
}
