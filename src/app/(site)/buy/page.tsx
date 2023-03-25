'use client';
import ResourceSearch from '@/components/resourceSearch.tsx';
import { useSession } from 'next-auth/react';

function Buy(): React.ReactElement {
  const session = useSession();
  console.log(session);
  const handleChange = (value: string) => {
    console.log(value);
  };
  return (
    <div>
      <ResourceSearch onChange={handleChange} />
    </div>
  );
}

export default Buy;
