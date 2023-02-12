import type { RecordInfo } from '~/types'
import { generateBaseFields, generateSortOptions } from '~/services/recordInfo'
import { SimpleCollection } from '../simple'
import BooleanColumn from '~/components/table/booleanColumn.vue'
import { deployCollection, goToMintPage } from '../actions'

export const Collection = <RecordInfo<'collection'>>{
  ...SimpleCollection,
  fields: {
    ...generateBaseFields(SimpleCollection),
    symbol: {
      text: 'Symbol',
    },
    isNumbered: {
      text: 'Is Numbered',
      inputType: 'switch',
      default: () => true,
      component: BooleanColumn,
    },
    price: {
      text: 'Price (USD)',
      optional: true,
    },
    maxSupply: {
      text: 'Max Supply',
      optional: true,
    },
    collectionId: {
      text: 'Collection ID',
    },
    isDeployed: {
      text: 'Is Deployed',
      component: BooleanColumn,
    },
  },
  paginationOptions: {
    searchOptions: undefined,
    filterOptions: [],
    heroOptions: {},
    sortOptions: [
      ...generateSortOptions('createdAt'),
      ...generateSortOptions('updatedAt'),
    ],
    headerOptions: [
      {
        field: 'nameWithAvatar',
        hideIfGrid: true,
      },
      {
        field: 'symbol',
        width: '150px',
      },
      {
        field: 'price',
        align: 'right',
        width: '200px',
      },
      {
        field: 'maxSupply',
        align: 'right',
        width: '200px',
      },
      {
        field: 'isDeployed',
        width: '150px',
      },
      {
        field: 'updatedAt',
        width: '150px',
      },
    ],
  },
  addOptions: {
    fields: [
      'avatar',
      'name',
      'description',
      'symbol',
      'isNumbered',
      'price',
      'maxSupply',
    ],
  },
  editOptions: {
    fields: [
      'avatar',
      'name',
      'description',
      'symbol',
      'isNumbered',
      'price',
      'maxSupply',
    ],
  },
  viewOptions: {
    fields: [
      'avatar',
      'name',
      'description',
      'symbol',
      'isNumbered',
      'price',
      'maxSupply',
      'collectionId',
      'isDeployed',
    ],
    heroOptions: {},
  },
  enterOptions: {
    routeType: 'a',
  },
  deleteOptions: {},
  shareOptions: {},
  customActions: [
    {
      text: 'Deploy',
      icon: 'mdi-upload',
      showIf: (that, item) => !item.isDeployed,
      simpleActionOptions: deployCollection,
    },
    {
      text: 'Go to Mint Page',
      icon: 'mdi-open-in-new',
      showIf: (that, item) => item.collectionId,
      simpleActionOptions: goToMintPage,
    },
  ],
  expandTypes: [],
}
