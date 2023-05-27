import GenericSelect from '@/components/form/GenericSelect';
import { globalActions } from '@/features/global/globalSlice';
import { useAppDispatch, useAppSelector } from '@/features/store/hooks';
import { ApiStatusEnum } from '@/lib/axios/apiTypes';
import { selectItemParser } from '@/lib/parser/selectItemsParser';
import { Item, ItemCategory, ItemType } from '@prisma/client';
import { ChangeEvent, memo, useEffect, useState } from 'react';
import {
  getItemSearchEngineState,
  itemSearchEngineActions,
} from '../itemSearchEngineSlice';
import {
  fetchItemCategoriesThunk,
  fetchItemTypesThunk,
  fetchItemsThunk,
} from '../itemSearchEngineThunks';
import styles from './itemSearchEngineContainer.module.scss';

interface IItemSearchEngineContainerProps {
  callback: (item: Item | null) => void;
  toReload?: string[];
}

const initialState = {
  itemCategory: null,
  itemType: null,
  item: null,
};

function ItemSearchEngineContainer({
  callback,
  toReload,
}: IItemSearchEngineContainerProps): JSX.Element {
  const [selected, setSelected] = useState<SelectedDatas>(initialState);
  const { itemCategories, itemTypes, items } = useAppSelector(
    getItemSearchEngineState
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(itemSearchEngineActions.reset());
    };
  }, []);

  useEffect(() => {
    if (
      !itemCategories.result &&
      itemCategories.status === ApiStatusEnum.IDLE
    ) {
      dispatch(fetchItemCategoriesThunk());
    }
  }, [itemCategories.result]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>, type: string) => {
    const value = e.target.value;
    switch (type) {
      case 'category':
        {
          setSelected({
            ...selected,
            itemCategory: itemCategories.result?.find(
              (f) => f.id === value
            ) as ItemCategory,
          });
          dispatch(fetchItemTypesThunk({ itemCategoryId: value }));
        }
        break;
      case 'type':
        {
          setSelected({
            ...selected,
            itemType: itemTypes.result?.find((f) => f.id === value) as ItemType,
          });
          dispatch(fetchItemsThunk({ itemTypeId: value }));
        }
        break;
      case 'item':
        {
          const i = items.result?.find((f) => f.id === value) as Item;
          setSelected({
            ...selected,
            item: i,
          });
          callback(i);
          if (toReload) {
            dispatch(globalActions.addReload(toReload));
          }
        }
        break;
      default:
        break;
    }
  };

  return (
    <section className={styles.container}>
      <GenericSelect
        items={selectItemParser(itemCategories.result)}
        name='itemCategory'
        noValue='Categorie'
        value={selected.itemCategory?.id ?? ''}
        onChange={(e) => handleChange(e, 'category')}
      />
      <GenericSelect
        items={selectItemParser(itemTypes.result)}
        name='itemType'
        noValue='Type'
        value={selected.itemType?.id ?? ''}
        onChange={(e) => handleChange(e, 'type')}
      />
      <GenericSelect
        items={selectItemParser(items.result)}
        name='item'
        noValue='Item'
        value={selected.item?.id ?? ''}
        onChange={(e) => handleChange(e, 'item')}
      />
    </section>
  );
}

export default memo(ItemSearchEngineContainer);
