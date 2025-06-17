import { Admin, Layout, LayoutProps, Resource } from "react-admin";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { dataProvider } from "./dataProvider";
import { Dashboard } from "./smple/dashboard";
import { authProvider, MyPermissions } from "./authProvider";
import { MyAppBar } from "./layouts/myAppbar";
import { RESOURCE } from "./config";
import {
  AccountList,
  AccountCreate,
  AccountEdit,
  AccountShow,
} from "./account";
import { RoleCreate, RoleList, RoleShow } from "./roles";
import ProductCreate from "./products/productCreate";
import { ProductList } from "./products/productList";
import { ProductEdit } from "./products/productEdit";

const MyLayout = (props: LayoutProps) => (
  <Layout {...props} appBar={MyAppBar} />
);

export const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    dashboard={Dashboard}
    layout={MyLayout}
    darkTheme={{ palette: { mode: "dark" } }}
  >
    {(permissions: MyPermissions) => (
      <>
        {true && (
          <Resource
            name={RESOURCE.accounts}
            icon={ManageAccountsIcon}
            list={
              permissions.canRead(RESOURCE.accounts) ? AccountList : undefined
            }
            show={
              permissions.canRead(RESOURCE.accounts) ? AccountShow : undefined
            }
            create={
              permissions.canCreate(RESOURCE.accounts)
                ? AccountCreate
                : undefined
            }
            edit={
              permissions.canEdit(RESOURCE.accounts) ? AccountEdit : undefined
            }
          />
        )}

        <Resource
          name={RESOURCE.roles}
          icon={AssignmentIndIcon}
          list={permissions.canRead(RESOURCE.roles) ? RoleList : undefined}
          create={
            permissions.canCreate(RESOURCE.roles) ? RoleCreate : undefined
          }
          // edit={permissions.canEdit(RESOURCE.roles) ? RoleEdit : undefined}
          show={permissions.canRead(RESOURCE.roles) ? RoleShow : undefined}
        />

        <Resource
          name="products"
          list={permissions.canRead(RESOURCE.roles) ? ProductList : undefined}
          create={ProductCreate}
          edit={permissions.canEdit(RESOURCE.roles) ? ProductEdit : undefined}
        />
      </>
    )}
  </Admin>
);
