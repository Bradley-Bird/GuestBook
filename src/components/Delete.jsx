import React from 'react';
import { Button } from '@mui/material';
import { deleteEntryById } from '../services/entries';

export default function Delete(update) {
  const handleDelete = async () => {
    const deleted = await deleteEntryById(1);
    update(deleted);
  };
  return (
    <Button value="update" onChange={handleDelete}>
      delete
    </Button>
  );
}
