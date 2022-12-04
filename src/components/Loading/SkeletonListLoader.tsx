import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useViewportUnits } from '@app/hooks/main';

export default function SkeletonListLoader() {
  const { vw } = useViewportUnits();
  const numOfPlaceholders = [...Array(5)].map((e, i) => i + 1);

  return (
    <SkeletonPlaceholder
      borderRadius={10}
      backgroundColor="#1A1A1A"
      highlightColor="#6A6A6A"
      speed={850}>
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="flex-start" paddingHorizontal={4}>
        <SkeletonPlaceholder.Item
          width={vw * 12}
          height={vw * 5}
          borderRadius={5}
          marginRight={10}
        />
        <SkeletonPlaceholder.Item
          flexDirection="column"
          alignItems="flex-start"
          paddingHorizontal={4}>
          {numOfPlaceholders.map((index) => (
            <SkeletonPlaceholder.Item
              flexDirection="column"
              alignItems="flex-start"
              marginBottom={12}
              key={index}>
              <SkeletonPlaceholder.Item
                width={vw * 75}
                height={vw * 5}
                borderRadius={5}
                marginBottom={5}
              />
              <SkeletonPlaceholder.Item
                width={vw * 50}
                height={vw * 5}
                borderRadius={5}
                marginBottom={5}
              />
              <SkeletonPlaceholder.Item
                width={vw * 15}
                height={vw * 5}
                borderRadius={5}
                marginBottom={5}
              />
              <SkeletonPlaceholder.Item width={vw * 30} height={vw * 5} borderRadius={5} />
            </SkeletonPlaceholder.Item>
          ))}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}
