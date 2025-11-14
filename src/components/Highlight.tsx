interface HighlightProps {
  color: 'red' | 'yellow' | 'green';
  children: React.ReactNode;
}

export default function Highlight({ color, children }: HighlightProps) {
  const colorClasses = {
    red: 'text-red-600 dark:text-red-400',
    yellow: 'text-yellow-600 dark:text-yellow-400',
    green: 'text-green-600 dark:text-green-400',
  };

  return (
    <span className={colorClasses[color]}>
      {children}
    </span>
  );
}
