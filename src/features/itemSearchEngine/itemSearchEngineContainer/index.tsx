import GenericSelect from '@/components/form/GenericSelect';
import { useAppDispatch, useAppSelector } from '@/features/store/hooks';
import { ApiStatusEnum } from '@/lib/axios/apiTypes';
import { selectItemParser } from '@/lib/parser/selectItemsParser';
import { ChangeEvent, useEffect } from 'react';
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

function ItemSearchEngineContainer(): JSX.Element {
  const {
    itemCategories,
    selectedItemCategory,
    itemTypes,
    selectedItemType,
    items,
    selectedItem,
  } = useAppSelector(getItemSearchEngineState);
  const dispatch = useAppDispatch();
  console.log(itemCategories.result);

  useEffect(() => {
    if (
      !itemCategories.result &&
      itemCategories.status === ApiStatusEnum.IDLE
    ) {
      dispatch(fetchItemCategoriesThunk());
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>, type: string) => {
    const value = e.target.value;
    switch (type) {
      case 'category':
        dispatch(itemSearchEngineActions.setSelectedItemCategory(value));
        dispatch(fetchItemTypesThunk({ itemCategoryId: value }));
        break;
      case 'type':
        dispatch(itemSearchEngineActions.setSelectedItemType(value));
        dispatch(fetchItemsThunk({ itemTypeId: value }));
        break;
      case 'item':
        dispatch(itemSearchEngineActions.setSelectedItem(value));
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
        value={selectedItemCategory?.id ?? ''}
        onChange={(e) => handleChange(e, 'category')}
      />
      <GenericSelect
        items={selectItemParser(itemTypes.result)}
        name='itemType'
        noValue='Type'
        value={selectedItemType?.id ?? ''}
        onChange={(e) => handleChange(e, 'type')}
      />
      <GenericSelect
        items={selectItemParser(items.result)}
        name='item'
        noValue='Item'
        value={selectedItem?.id ?? ''}
        onChange={(e) => handleChange(e, 'item')}
      />
    </section>
  );
}

export default ItemSearchEngineContainer;
