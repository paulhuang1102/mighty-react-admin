import HttpAgent from "./httpAgent";
import { RESOURCE, endpoint } from "../config";

interface ManagerInterface {
  overrides?: {
    [key: string]: HttpAgent;
  };
}

type AgentMap = {
  [key: string]: HttpAgent;
};

export default class HttpAgentManager {
  constructor({ overrides = {} }: ManagerInterface = {}) {
    Object.values(RESOURCE).map((v) => {
      if (v in overrides) {
        this.agents[v] = overrides[v];
      } else {
        this.agents[v] = new HttpAgent({ resource: v, apiUrl: endpoint });
      }
    });
  }

  agents: AgentMap = {};

  agent(resource: string): HttpAgent {
    const _agent = this.agents[resource];

    if (_agent) return _agent;

    throw Error(`${resource} HttpAgent not found`);
  };
}
