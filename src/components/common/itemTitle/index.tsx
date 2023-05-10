import { Item } from '@prisma/client';
import Image from 'next/image';

interface IItemTitleProps {
  item: Item | null;
}

const IMG_URL = process.env.NEXT_PUBLIC_ENTROPEDIA_IMG_BASE_URL;

function ItemTitle({ item }: IItemTitleProps): React.ReactElement {
  return (
    <h4>
      <>
        {item && (
          <>
            <Image
              src={`${IMG_URL}${item?.imageUrlId}Original.png`}
              alt='ressource'
              width={20}
              height={20}
            />
            <span>{item?.name}</span>
          </>
        )}
      </>
    </h4>
  );
}

export default ItemTitle;
