import { Admin, Layout, LayoutProps, Resource, ShowGuesser } from "react-admin";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";

import { dataProvider } from "./dataProvider";
import { UserList } from "./smple/userList";
import { PostList } from "./smple/postList";
import { PostEdit } from "./smple/postEdit";
import { PostCreate } from "./smple/postCreate";
import { Dashboard } from "./smple/dashboard";
import { authProvider } from "./authProvider";
import { MyAppBar } from "./layouts/myAppbar";

const MyLayout = (props: LayoutProps) => <Layout {...props} appBar={MyAppBar} />;

export const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    dashboard={Dashboard}
    layout={MyLayout}
    darkTheme={{ palette: { mode: "dark" } }}
  >
    <Resource
      name="posts"
      list={PostList}
      edit={PostEdit}
      create={PostCreate}
      icon={PostIcon}
    />
    <Resource
      name="users"
      list={UserList}
      show={ShowGuesser}
      recordRepresentation="name"
      icon={UserIcon}
    />
  </Admin>
);
