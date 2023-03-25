'use client';

import { useState } from 'react';
import ResourceTypeSelect from './ResourceTypeSelect';

interface IResourceSearchProps {
  onChange: (value: string) => void;
}
function ResourceSearch({ onChange }: IResourceSearchProps) {
  const [type, setType] = useState<string>('');
  const handleTypeChange = (value: string) => {
    setType(value);
  };
  console.log(type);
  return (
    <div>
      <ResourceTypeSelect onChange={handleTypeChange} />
    </div>
  );
}

export default ResourceSearch;
