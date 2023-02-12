import { handleError, openLink } from '~/services/base'
import { executeGiraffeql } from '~/services/giraffeql'

// special actions go here
export const deployCollection = {
  handleClick: async (that, item) => {
    try {
      if (!that.$store.getters['auth/user']) {
        throw new Error('Login required')
      }

      await executeGiraffeql(that, {
        deployCollection: {
          id: true,
          __args: {
            id: item.id,
          },
        },
      })

      that.$root.$emit('refresh-interface', 'collection')
      that.$notifier.showSnackbar({
        message: `Collection deployed`,
        variant: 'success',
      })
    } catch (err) {
      handleError(that, err)
    }
  },
  isAsync: true,
}

export const goToMintPage = {
  handleClick: async (that, item) => {
    try {
      openLink(
        `https://xoxo-snowy.vercel.app/?collectionId=${item.collectionId}`
      )
    } catch (err) {
      handleError(that, err)
    }
  },
  isAsync: false,
}
