type Resources = import('@prisma/client').Resource[];

type ResourceState = {
  resources: ApiType<Resources | null>;
};
