import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useViewportUnits } from '@app/hooks/main';

export default function SkeletonLoaderBig() {
  const { vw } = useViewportUnits();

  return (
    <SkeletonPlaceholder
      borderRadius={10}
      backgroundColor="#1A1A1A"
      highlightColor="#6A6A6A"
      speed={1000}>
      <SkeletonPlaceholder.Item justifyContent="center" alignItems="center" paddingHorizontal={4}>
        <SkeletonPlaceholder.Item width={vw * 45} height={vw * 64} borderRadius={5} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}
