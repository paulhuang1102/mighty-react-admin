import {
  CreateParams,
  DeleteManyParams,
  DeleteParams,
  GetListParams,
  GetManyParams,
  GetManyReferenceParams,
  GetOneParams,
  UpdateManyParams,
  UpdateParams,
  fetchUtils,
} from "react-admin";
import { stringify } from "query-string";

const httpClient = fetchUtils.fetchJson;

interface HttpAgentInterface {
  resource: string;
  apiUrl: string;
}

export default class HttpAgent {
  constructor({ resource, apiUrl }: HttpAgentInterface) {
    this.resource = resource;
    this.apiUrl = apiUrl;
  }

  private resource: string;
  private apiUrl: string;

  public getList(params: GetListParams) {
    const query = this.getQuery(params);

    const url = `${this.apiUrl}/${this.resource}?${query}`;

    return httpClient(url).then(({ headers, json }) => ({
      data: json,
      total: this.parseTotal(headers),
    }));
  }

  public getOne(params: GetOneParams) {
    return httpClient(`${this.apiUrl}/${this.resource}/${params.id}`).then(
      ({ json }) => ({
        data: json,
      })
    );
  }

  public getMany(params: GetManyParams) {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${this.apiUrl}/${this.resource}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => ({ data: json }));
  }

  public getManyReference(params: GetManyReferenceParams) {
    const query = this.getQuery(params);

    const url = `${this.apiUrl}/${this.resource}?${query}`;

    return httpClient(url).then(({ headers, json }) => ({
      data: json,
      total: this.parseTotal(headers),
    }));
  }

  public update(params: UpdateParams) {
    return httpClient(`${this.apiUrl}/${this.resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  }

  public updateMany(params: UpdateManyParams) {
    const query = stringify({
      filter: JSON.stringify({ id: params.ids }),
    });
    return httpClient(`${this.apiUrl}/${this.resource}?${query}}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  }

  public create(params: CreateParams) {
    return httpClient(`${this.apiUrl}/${this.resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id } as any,
    }));
  }

  public delete(params: DeleteParams) {
    return httpClient(`${this.apiUrl}/${this.resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => ({ data: json }));
  }

  public deleteMany(params: DeleteManyParams) {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${this.apiUrl}/${this.resource}?${stringify(query)}`, {
      method: "DELETE",
    }).then(({ json }) => ({ data: json }));
  }

  protected getQuery(params: GetListParams | GetManyReferenceParams): string {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    if ('id' in params) {
        params.target = params.id.toString()
    }

    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };

    return stringify(query);
  }

  protected parseTotal(headers: Headers) {
    
    return parseInt(
      (headers.get("content-range") || "0").split("/").pop() || "0",
      10
    );
  }
}
