import { CreateParams } from "react-admin";
import HttpAgent, {
  HttpAgentInterface,
  httpClient,
} from "../dataProvider/httpAgent";

export class RoleHttpAgent extends HttpAgent {
  constructor({ resource, apiUrl }: HttpAgentInterface) {
    super({ resource, apiUrl });
  }

  public create(params: CreateParams) {
    const { data } = params;
    const permissions = { ...data };
    delete permissions.slug;

    return httpClient(`${this.apiUrl}/${this.resource}`, {
      method: "POST",
      body: JSON.stringify({
        slug: params.data.slug,
        permissions,
      }),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id } as any,
    }));
  }
}
