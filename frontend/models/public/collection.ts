import { Collection } from '../base'

export const PublicCollection = {
  ...Collection,
  title: `Public ${Collection.pluralName}`,
  paginationOptions: {
    ...Collection.paginationOptions,
  },
  addOptions: undefined,
  editOptions: undefined,
  deleteOptions: undefined,
  importOptions: undefined,
  enterOptions: {
    routeType: 'i',
  },
}
