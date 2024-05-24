import { useMediaQuery, Theme } from "@mui/material";
import {
  List,
  Datagrid,
  TextField,
  SimpleList,
  EditButton,
  Create,
  SimpleForm,
  TextInput,
  PasswordInput,
//   ReferenceInput,
//   AutocompleteInput,
  required,
  Edit,
//   Toolbar,
//   useRecordContext,
//   SaveButton,
//   DeleteWithConfirmButton,
  EmailField,
  BooleanInput,
  BooleanField,
  ReferenceArrayInput,
  Show,
  SimpleShowLayout,
} from "react-admin";

export const AccountList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.id}
          secondaryText={(record) => record.username}
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField source="id" />
          <TextField source="name" />
          <EmailField source="email" />
          <BooleanField source="status" />
          <EditButton />
        </Datagrid>
      )}
    </List>
  );
};

export const AccountCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={[required()]} />

      <PasswordInput source="password" validate={[required()]} />
      <ReferenceArrayInput
          source="role_ids"
          reference="roles"
        ></ReferenceArrayInput>
      <TextInput source="email" />
      {/* <ReferenceInput source="role_id" reference="roles">
        <AutocompleteInput label="Role" optionText={(choice) => choice.name} />
      </ReferenceInput> */}
      <BooleanInput label="Status" source="status" />
    </SimpleForm>
  </Create>
);

// const EditToolbar = () => {
//   const record = useRecordContext();
//   return (
//     <Toolbar>
//       <SaveButton />
//       <DeleteWithConfirmButton
//         confirmContent="You will not be able to recover this record. Are you sure?"
//         confirmColor="warning"
//         translateOptions={{ name: record.name }}
//       />
//     </Toolbar>
//   );
// };

export const AccountEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" validate={[required()]} />
      {/* <PasswordInput source="password" validate={[required()]} /> */}
      <TextInput source="email" />
      {/* <ReferenceArrayInput
          source="role_ids"
          reference="roles"
        ></ReferenceArrayInput> */}
      {/* <ReferenceInput source="role_id" reference="roles">
        <AutocompleteInput label="Role" optionText={(choice) => choice.name} />
      </ReferenceInput> */}
      <BooleanInput label="Status" source="status" />
    </SimpleForm>
  </Edit>
);

export const AccountShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="name" />
            <TextField source="email" />
            <BooleanField source="status" />
        </SimpleShowLayout>
    </Show>
);
