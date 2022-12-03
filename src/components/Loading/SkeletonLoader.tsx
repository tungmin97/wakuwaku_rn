import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useViewportUnits } from '@app/hooks/main';

export default function SkeletonLoader() {
  const { vw } = useViewportUnits();

  return (
    <SkeletonPlaceholder
      borderRadius={10}
      backgroundColor="#1A1A1A"
      highlightColor="#6A6A6A"
      speed={850}>
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" paddingHorizontal={4}>
        <SkeletonPlaceholder.Item width={vw * 33} height={vw * 46} borderRadius={5} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}
