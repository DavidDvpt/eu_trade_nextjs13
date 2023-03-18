'use client';
import React from 'react';
import AuthCheck from './AuthCheck.client';

function layout({ children }: IChildren): React.ReactElement {
  return (
    <div>
      <AuthCheck>{children}</AuthCheck>
    </div>
  );
}

export default layout;
