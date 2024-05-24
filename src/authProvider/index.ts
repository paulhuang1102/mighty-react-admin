import { AuthProvider } from "react-admin";
import { endpoint } from "../config";
export const authProvider: AuthProvider = {
  // called when the user attempts to log in
  login: ({ username, password }) => {
    const request = new Request(endpoint + "/login", {
      method: "POST",
      body: JSON.stringify({ name: username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(({ data }) => {
        const { token } = data;
        // store the token in local storage
        localStorage.setItem("token", token);
        // localStorage.setItem("roles", roles);

        // const p = getPermissionsFromRoles(roles);

        // localStorage.setItem("permissions", JSON.stringify(p));
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },
  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    localStorage.removeItem("permissions");
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({ status }: { status: number }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("username");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => {
    // const permissions = JSON.parse(localStorage.getItem("permissions") || "{ roles: [], actions: {} }");
    // console.log(permissions);

    // Fake permissions
    return Promise.resolve(
      new MyPermissions({
        roles: ['admin'],
        actions: {
          accounts: ["create", "read", "edit", "delete", "export"],
          roles: ["create", "read", "edit", "delete"],
        },
      })
    );
  },
};

export interface AccountPermissions {
  roles: string[];
  actions: { [key: string]: string[] };
}

// const getPermissionsFromRoles = (roles: string[]): AccountPermissions => {
//   const actions: { [key: string]: string[] } = {};
//   const permissions = rolePermission[roles[0]] || [];
//   permissions.forEach((permission: any) => {
//     actions[permission.resource] = permission.action;
//   });

//   return {
//     roles,
//     actions,
//   };
// };

export class MyPermissions implements AccountPermissions {
  constructor(param: AccountPermissions) {
    this.roles = param.roles;
    this.actions = param.actions;
  }
  roles: string[];
  actions: { [key: string]: string[] };

  fullAction(resource: string) {
    return (
      "*" in this.actions.hasOwnProperty || this.actions[resource].includes("*")
    );
  }

  canCreate(resource: string): boolean {
    return (
      this.fullAction(resource) || this.actions[resource].includes("create")
    );
  }

  canRead(resource: string): boolean {
    return this.fullAction(resource) || this.actions[resource].includes("read");
  }

  canEdit(resource: string): boolean {
    return this.fullAction(resource) || this.actions[resource].includes("edit");
  }

  canExport(resource: string): boolean {
    return (
      this.fullAction(resource) || this.actions[resource].includes("export")
    );
  }

  canDelete(resource: string): boolean {
    return (
      this.fullAction(resource) || this.actions[resource].includes("delete")
    );
  }
}
