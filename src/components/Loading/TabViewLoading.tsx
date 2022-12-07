import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useViewportUnits } from '@app/hooks/main';

type Props = {
  num: number;
};

export default function TabViewLoading({ num }: Props) {
  const { vw } = useViewportUnits();
  const numOfPlaceholders = [...Array(num)].map((_e, i) => i + 1);

  return (
    <SkeletonPlaceholder
      borderRadius={5}
      backgroundColor="#1A1A1A"
      highlightColor="#6A6A6A"
      speed={850}>
      <SkeletonPlaceholder.Item alignItems="center" paddingHorizontal={5}>
        {numOfPlaceholders.map((i) => (
          <SkeletonPlaceholder.Item
            key={i}
            width={vw * 90}
            height={vw * 23}
            paddingVertical={5}
            marginBottom={7}
          />
        ))}
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}
