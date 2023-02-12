export const siteName = process.env.siteName
export const siteDescription = process.env.siteDescription
export const siteImageUrl = process.env.siteImageUrl
export const siteContactEmail = process.env.siteContactEmail
export const siteDiscordLink = process.env.siteDiscordLink
export const siteGithubRepositoryUrl = process.env.siteGithubRepositoryUrl
export const logoHasLightVariant = process.env.logoHasLightVariant
export const defaultGridView = process.env.defaultGridView

export const firebaseConfig = {
  apiKey: 'AIzaSyAUieB1UHGKT4aSBJIRMY1kyrFd3YQe9ik',
  authDomain: 'cometlify.com',
  projectId: 'cometlify',
  storageBucket: 'cometlify.appspot.com',
  messagingSenderId: '469669236109',
  appId: '1:469669236109:web:f9d93688c22c759d0901c4',
}

export const routesMap = {
  a: ['apiKey', 'file', 'user', 'userUserFollowLink'],
  i: ['user'],
  my: ['apiKey', 'file'],
  s: [],
}
