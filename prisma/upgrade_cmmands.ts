import client from './prismadb';

const addItemCategorie = async () => {
  const res = await client.itemCategory.create({
    data: {
      name: 'Ressources',
    },
  });

  return res;
};

addItemCategorie().then(async (response) => {
  const resourceTypes = await client.resourceType.findMany();

  Promise.all(
    resourceTypes.map(
      async (e) =>
        await client.itemType.create({
          data: {
            ...e,
            itemCategoryId: response.id,
          },
        })
    )
  ).then(async () => {
    const resources = await client.resource.findMany();

    Promise.all(
      resources.map(async (e) => {
        const temp: any = { ...e, itemTypeId: e.resourceTypeId };
        delete temp.resourceTypeId;

        return await client.item.create({ data: temp });
      })
    ).then(async () => {
      const t = await client.transaction.findMany();

      Promise.all(
        t.map(
          async (m) =>
            await client.transaction.update({
              where: { id: m.id },
              data: { itemId: m.resourceId as string },
            })
        )
      ).then((response) => console.log(response));
    });
  });
});
