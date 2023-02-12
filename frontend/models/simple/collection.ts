import type { SimpleRecordInfo } from '~/types'

export const SimpleCollection = <SimpleRecordInfo<'collection'>>{
  typename: 'collection',
  pluralTypename: 'collections',
  name: 'Collection',
  pluralName: 'Collections',
  icon: 'mdi-image-multiple',
  hasName: true,
  hasAvatar: true,
  hasDescription: true,
  requiredFields: ['collectionId'],
}
