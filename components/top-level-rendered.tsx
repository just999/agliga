// components/TopLevelRenderer.tsx
'use client';

import { useTopComponentStore } from '@/store/use-top-component-store';
import styles from './TopLevelRenderer.module.css';

export function TopLevelRenderer() {
  const { content, hideComponent } = useTopComponentStore();

  if (!content) return null;

  return (
    <div>
      <div>
        {content}
        <button onClick={hideComponent}>Close</button>
      </div>
    </div>
  );
}
