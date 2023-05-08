import { SessionContext, SessionState, TradingType } from '@prisma/client';
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
        t.map(async (m, i) => {
          return client.session
            .create({
              data: {
                id: m.id,
                number: i + 1,
                tradingType: m.type as TradingType,
                sessionState:
                  (m.sellStatus as SessionState) ?? SessionState.ENDED,
                sessionContext: SessionContext.TRADING,
                createdAt: m.createdAt,
                modifiedAt: m.modifiedAt,
                userId: m.userId,
              },
            })
            .then(
              async (response) => {
                return await client.sessionRow.create({
                  data: {
                    quantity: m.quantity,
                    fee: m.fee ?? 0,
                    value: m.value,
                    sessionId: response.id,
                    itemId: m.resourceId,
                  },
                });
              },
              (error) => console.log(error)
            );
        })
      );
    });
  });
});
