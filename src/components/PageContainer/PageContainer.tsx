// src/components/PageContainer/PageContainer.tsx
import type { ReactNode } from 'react';
import './PageContainer.css';

interface PageContainerProps {
  children: ReactNode;
  className?: string; // para customizações extras, se necessário
}

function PageContainer({ children, className = '' }: PageContainerProps) {
  return <div className={`page-container ${className}`}>{children}</div>;
}

export default PageContainer;
