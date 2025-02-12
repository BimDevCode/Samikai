
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7069/api/',
  baseArticleUrl: 'https://localhost:7069/',
  stsAuthority: 'http://localhost:5223/',
  clientId: 'interactive.public',
  clientRoot: 'https://localhost:5211/',
  clientScope: 'openid profile email api userInteraction',
  apiRoot: 'http://localhost:5223/api',
};

//For Proxy Included
// export const environment = {
//   production: false,
//   apiUrl: 'https://localhost:7109/article/api/',
//   baseArticleUrl: 'https://localhost:7109/article/',
//   stsAuthority: 'http://localhost:7109/identity/',
//   clientId: 'interactive.public',
//   clientRoot: 'https://localhost:5211/',
//   clientScope: 'openid profile email api userInteraction',
//   apiRoot: 'http://localhost:7109/identity/api',
// };

//For Azure Included
// export const environment = {
//   production: false,
//   apiUrl: 'https://20.215.88.199:7069/api/',
//   baseArticleUrl: 'https://20.215.88.199:7069/',
//   stsAuthority: 'http://20.215.89.33:5223/',
//   clientId: 'interactive.public',
//   clientRoot: 'https://74.248.9.203:5211/',
//   clientScope: 'openid profile email api userInteraction',
//   apiRoot: 'http://20.215.89.33:5223/api',
// };