import { Admin, Resource, ShowGuesser } from "react-admin";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";

import { dataProvider } from "./dataProvider";
import { UserList } from "./smple/userList";
import { PostList } from "./smple/postList";
import { PostEdit } from "./smple/postEdit";
import { PostCreate } from "./smple/postCreate";
import { Dashboard } from "./smple/dashboard";
import { authProvider } from "./authProvider";

export const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider} dashboard={Dashboard}>
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
