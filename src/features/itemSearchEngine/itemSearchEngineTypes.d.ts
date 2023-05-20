type ItemCategories = import('@prisma/client').ItemCategory[];
type ItemTypes = import('@prisma/client').ItemType[];
type Items = import('@prisma/client').Item[];

type ItemSearchEngineState = {
  itemCategories: ApiType<ItemCategories | null>;
  itemTypes: ApiType<ItemTypes | null>;
  items: ApiType<Items | null>;
};

type SelectedDatas = {
  itemCategory: import('@prisma/client').ItemCategory | null;
  itemType: import('@prisma/client').ItemType | null;
  item: import('@prisma/client').Item | null;
};
