import {
  CheckboxGroupInput,
  Create,
  Datagrid,
  DeleteWithConfirmButton,
  EditButton,
  List,
  SaveButton,
  Show,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  Toolbar,
  useRecordContext,
} from "react-admin";
import { RESOURCE } from "../config";

export const RoleList = () => {
  return (
    <List>
      <Datagrid rowClick="show">
        <TextField source="id" />
        <TextField source="username" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

const actionPermissions = ["read", "write", "edit", "export"];

export const RoleCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="slug" label="Role Name" />
      {Object.values(RESOURCE).map((v) => {
        return (
          <CheckboxGroupInput
            key={v}
            source={v}
            choices={actionPermissions.map((v) => ({ id: v, name: v }))}
          />
        );
      })}
    </SimpleForm>
  </Create>
);

export const RoleEdit = () => {
  <Create>
    <SimpleForm toolbar={<EditToolbar />}>
      <TextInput source="name" label="Role Name" />
      {Object.values(RESOURCE).map((v) => {
        return (
          <CheckboxGroupInput
            key={v}
            source={v}
            choices={actionPermissions.map((v) => ({ id: v, name: v }))}
          />
        );
      })}
    </SimpleForm>
  </Create>;
};

const EditToolbar = () => {
  const record = useRecordContext();
  return (
    <Toolbar>
      <SaveButton />
      <DeleteWithConfirmButton
        confirmContent="You will not be able to recover this record. Are you sure?"
        confirmColor="warning"
        translateOptions={{ name: record.name }}
      />
    </Toolbar>
  );
};

export const RoleShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" />
    </SimpleShowLayout>
  </Show>
);
