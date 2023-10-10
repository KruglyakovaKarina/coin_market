import { useState, useMemo } from 'react';
import { ICoin } from '../interfaces/coin.interface';

enum DirectionEnum {
  DEC = 'DEC',
  ASC = 'ASC',
}

export const useSortableData = (items: ICoin[]) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: DirectionEnum;
  }>({ key: 'rank', direction: DirectionEnum.ASC });
  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig.key !== '') {
      const firstItem: any = sortableItems.at(0);
      if (firstItem && !isNaN(firstItem[sortConfig.key])) {
        sortableItems.sort((a: any, b: any) => {
          return sortConfig.direction === DirectionEnum.ASC
            ? parseFloat(a[sortConfig.key]) - parseFloat(b[sortConfig.key])
            : parseFloat(b[sortConfig.key]) - parseFloat(a[sortConfig.key]);
        });
      } else {
        return sortConfig.direction === DirectionEnum.ASC
          ? sortableItems.sort()
          : sortableItems.sort().reverse();
      }
    }
    return sortableItems ?? [];
  }, [items, sortConfig]);

  const requestSort = (key: string) => {
    let direction = DirectionEnum.ASC;
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === DirectionEnum.ASC
    ) {
      direction = DirectionEnum.DEC;
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};
