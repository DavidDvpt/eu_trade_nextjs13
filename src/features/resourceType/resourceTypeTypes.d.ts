type ResourceTypes = import('@prisma/client').ResourceType[];

type ResourceTypeState = {
  resourceTypes: ApiType<ResourceTypes | null>;
};
