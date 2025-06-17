import { CreateParams, } from "react-admin";
import HttpAgent, {
  HttpAgentInterface,
  httpClient,
} from "../dataProvider/httpAgent";

export class ProductHttpAgent extends HttpAgent {
  constructor({ resource, apiUrl }: HttpAgentInterface) {
    super({ resource, apiUrl });
  }

  public create(params: CreateParams) {
    const { data } = params;

    return httpClient(`${this.apiUrl}/${this.resource}`, {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        stockQuantity: data.quantity,
        description: data.description,
        price: data.price,
      }),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id } as any,
    }));
  }
}
