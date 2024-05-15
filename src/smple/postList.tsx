import { List, Datagrid, TextField, ReferenceField, EditButton, TextInput, ReferenceInput } from "react-admin";

const postFilters = [
    <TextInput key={'q'} source="q" label="Search" alwaysOn />,
    <ReferenceInput key={'userId'} source="userId" label="User" reference="users" />,
];

export const PostList = () => (
    <List filters={postFilters}>
        <Datagrid>
            <TextField source="id" />
            <ReferenceField source="userId" reference="users" link="show"/>
            <TextField source="title" />
            <TextField source="body" />
            <EditButton />
        </Datagrid>
    </List>
);
