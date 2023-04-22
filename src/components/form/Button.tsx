interface IButtonProps extends IChildren {
  type: 'submit' | 'reset' | 'button';
  className?: string;
  primary?: boolean;
  warning?: boolean;
  error?: boolean;
  success?: boolean;
  onClick?: () => void;
}

function Button({
  children,
  type = 'button',
  className,
  primary,
  error,
  success,
  warning,
  onClick,
}: IButtonProps) {
  const btnType = primary
    ? 'info'
    : error
    ? 'error'
    : success
    ? 'success'
    : warning
    ? 'warning'
    : '';
  return (
    <button
      type={type}
      className={`${className ?? ''} ${btnType}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
