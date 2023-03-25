'use client';
import ResourceSearch from '@/components/resourceSearch.tsx';

function Buy(): React.ReactElement {
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
