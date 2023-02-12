import { Collection } from '../base'

export const MyCollection = {
  ...Collection,
  title: `My ${Collection.pluralName}`,
  paginationOptions: {
    ...Collection.paginationOptions,
    downloadOptions: undefined,
  },
  enterOptions: {
    routeType: 'my',
  },
}
