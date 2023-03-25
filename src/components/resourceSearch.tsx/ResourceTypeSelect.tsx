'use client';

import React, { useEffect, useState } from 'react';
import GenericSelect from '../form/GenericSelect.client';

interface IResourceTypeSelectProps {
  onChange: (value: string) => void;
}

function ResourceTypeSelect({
  onChange,
}: IResourceTypeSelectProps): React.ReactElement {
  const [datas, setDatas] = useState<SelectTypes>([]);

  const getDatas = async () => {
    const response = await fetch('http://localhost:3000/api/resourceType');
    const result = await response.json();
    setDatas(result.map((m: any) => ({ value: m.id, label: m.name })));
  };

  useEffect(() => {
    getDatas();
  }, []);

  return <GenericSelect items={datas} onChange={onChange} />;
}

export default ResourceTypeSelect;
