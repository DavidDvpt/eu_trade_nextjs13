type ItemCategories = import('@prisma/client').ItemCategory[];
type ItemTypes = import('@prisma/client').ItemType[];
type Items = import('@prisma/client').Item[];

type ItemSearchEngineState = {
  itemCategories: ApiType<ItemCategories | null>;
  selectedItemCategory: import('@prisma/client').ItemCategory | null;
  itemTypes: ApiType<ItemTypes | null>;
  selectedItemType: import('@prisma/client').ItemType | null;
  items: ApiType<Items | null>;
  selectedItem: import('@prisma/client').Item | null;
};
