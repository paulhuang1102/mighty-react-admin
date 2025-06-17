import { List, Datagrid, TextField, EditButton, TextInput, ReferenceInput, NumberField } from "react-admin";

const postFilters = [
    <TextInput key={'q'} source="q" label="Search" alwaysOn />,
    <ReferenceInput key={'userId'} source="userId" label="User" reference="users" />,
];

export const ProductList = () => (
    <List filters={postFilters}>
        <Datagrid>
            <TextField source="id" />
            {/* <ReferenceField source="userId" reference="users" link="show"/> */}
            <TextField source="name" />
            <NumberField source="price" />
            <NumberField source="quantity" />
            <EditButton />
        </Datagrid>
    </List>
);
