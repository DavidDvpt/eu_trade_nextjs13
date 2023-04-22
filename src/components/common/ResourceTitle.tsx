import { Resource } from '@prisma/client';
import Image from 'next/image';

interface IResourceTitleProps {
  resource: Resource | null;
}

const IMG_URL = process.env.NEXT_PUBLIC_ENTROPEDIA_IMG_BASE_URL;

function ResourceTitle({ resource }: IResourceTitleProps): React.ReactElement {
  return (
    <h4>
      <>
        {resource && (
          <>
            <Image
              src={`${IMG_URL}${resource?.imageUrlId}Original.png`}
              alt='ressource'
              width={20}
              height={20}
            />
            <span>{resource?.name}</span>
          </>
        )}
      </>
    </h4>
  );
}

export default ResourceTitle;
