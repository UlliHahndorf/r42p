import { ChangeEvent, useState } from 'react';

type ReturnType = {
  filter: string;
  handleFilterChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function useFilter(): ReturnType {
  const [filter, setFilter] = useState('');

  function handleFilterChange(event: ChangeEvent<HTMLInputElement>) {
    setFilter(event.target.value);
  }

  return { filter, handleFilterChange };
}
