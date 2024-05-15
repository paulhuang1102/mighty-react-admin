import { DataProvider } from "react-admin";
import HttpAgentManager from "./httpAgentManager";

const manager = new HttpAgentManager({});

export const dataProvider: DataProvider = {
  getList: (resource, params) => manager.agent(resource).getList(params),
  getOne: (resource, params) => manager.agent(resource).getOne(params),
  getMany: (resource, params) => manager.agent(resource).getMany(params),
  getManyReference: (resource, params) => manager.agent(resource).getManyReference(params),
  update: (resource, params) => manager.agent(resource).update(params),
  updateMany: (resource, params) => manager.agent(resource).updateMany(params),
  create: (resource, params) => manager.agent(resource).create(params),
  delete: (resource, params) => manager.agent(resource).delete(params),
  deleteMany: (resource, params) => manager.agent(resource).deleteMany(params),
};
