import { Collection } from '../base'

export const PublicCollection = {
  ...Collection,
  title: `Public ${Collection.pluralName}`,
  paginationOptions: {
    ...Collection.paginationOptions,
    defaultLockedFilters: (_that) => {
      return [
        {
          field: 'isDeployed',
          operator: 'eq',
          value: true,
        },
      ]
    },
  },
  addOptions: undefined,
  editOptions: undefined,
  deleteOptions: undefined,
  importOptions: undefined,
  enterOptions: {
    routeType: 'i',
  },
}
