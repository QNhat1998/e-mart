import { type SchemaTypeDefinition } from 'sanity';

import { categoryType } from './categoryType';
import { orderType } from './orderType';
import { productType } from './productType';
import { blockContentType } from './blockContentType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, orderType, productType, blockContentType],
};
