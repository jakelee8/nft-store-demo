import { FC } from "hono/jsx";

import { Collection } from "../lib/collections";

const CollectionCard: FC<{
  key: string;
  collection: Collection;
}> = ({ key, collection }) => (
  <div key={key} class="card bg-base-100 w-full shadow-xl">
    <figure>
      <img
        src={collection.imageUrl}
        alt={collection.name}
        class="w-full h-48 object-cover mb-2"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{collection.name}</h2>
      <p>{collection.description}</p>
    </div>
  </div>
);

export default CollectionCard;
