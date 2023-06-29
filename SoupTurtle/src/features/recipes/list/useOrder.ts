import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';

type ReturnType = {
  orderValue: string;
  handleOrderChange: (event: SelectChangeEvent) => void
};

export default function useOrder(): ReturnType {
  const [orderValue, setOrder] = useState('');

  function handleOrderChange(event: SelectChangeEvent) {
    setOrder(event.target.value);
  }
  return { orderValue, handleOrderChange };
}
