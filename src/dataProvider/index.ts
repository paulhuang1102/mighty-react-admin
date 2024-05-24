import { DataProvider } from "react-admin";
import HttpAgentManager from "./httpAgentManager";
import { RESOURCE, endpoint } from "../config";
import { RoleHttpAgent } from "../role/data";

const manager = new HttpAgentManager({
  overrides: {
    [RESOURCE.roles]: new RoleHttpAgent({
      resource: RESOURCE.roles,
      apiUrl: endpoint,
    }),
  },
});

console.log(manager);

export const dataProvider: DataProvider = {
  getList: (resource, params) => manager.agent(resource).getList(params),
  getOne: (resource, params) => manager.agent(resource).getOne(params),
  getMany: (resource, params) => manager.agent(resource).getMany(params),
  getManyReference: (resource, params) =>
    manager.agent(resource).getManyReference(params),
  update: (resource, params) => manager.agent(resource).update(params),
  updateMany: (resource, params) => manager.agent(resource).updateMany(params),
  create: (resource, params) => manager.agent(resource).create(params),
  delete: (resource, params) => manager.agent(resource).delete(params),
  deleteMany: (resource, params) => manager.agent(resource).deleteMany(params),
};

// import { combineDataProviders, fetchUtils } from "react-admin";
// import simpleRestProvider from "ra-data-simple-rest";
// import jsonServerProvider from "ra-data-json-server";
// import { RESOURCE, endpoint, endpoint2 } from "../config";

// const fetchJson = (url: string, options: fetchUtils.Options = {}) => {
//   options.user = {
//     authenticated: true,
//     // use the token from local storage
//     token: localStorage.getItem("token") ?? undefined,
//   };
//   return fetchUtils.fetchJson(url, options);
// };
// const baseDataProvider = {
//   ...simpleRestProvider(endpoint, fetchJson),
//   addRoles: (roleName: string, params: {[key: string]: any}) => {
//     const body = {
//       name: roleName,
//       ...params
//     }
//     return fetchJson(`${endpoint}/${RESOURCE.roles}`, { method: 'POST', body: JSON.stringify(body)}).then(({ json }) => {
//       return { data: json };
//     })
//   }
// };
// const customDataProvider = jsonServerProvider(endpoint2, fetchJson);

// export const dataProvider = combineDataProviders((resource: string) => {
//   switch (resource) {
//     case RESOURCE.accounts:
//     case RESOURCE.roles:
//       case RESOURCE.posts:
//       return baseDataProvider;
//     case RESOURCE.samples:
//     case RESOURCE.users:
//       return customDataProvider;
//     default:
//       throw new Error(`Unknown resource: ${resource}`);
//   }
// });
