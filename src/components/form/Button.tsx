import React from 'react';

interface IButtonProps {
  content: string | React.ReactNode;
  type: 'submit' | 'reset' | 'button';
  className?: string;
  info?: boolean;
  warning?: boolean;
  error?: boolean;
  success?: boolean;
}

function Button({
  content,
  type = 'button',
  className,
  info,
  error,
  success,
  warning,
}: IButtonProps) {
  const btnType = info
    ? 'info'
    : error
    ? 'error'
    : success
    ? 'success'
    : warning
    ? 'warning'
    : '';
  return (
    <button type={type} className={`${className ?? ''} ${btnType}`}>
      {content}
    </button>
  );
}

export default Button;