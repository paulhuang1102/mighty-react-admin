import { Edit, ReferenceInput, SimpleForm, TextInput, useRecordContext } from "react-admin";

const PostTitle = () => {
    const record = useRecordContext();

    return (
        <span>
            Post { record ? `${record.title}` : ''}
        </span>
    )
}

export const PostEdit = () => (
    <Edit title={<PostTitle />}>
        <SimpleForm>
            <TextInput source="id" InputProps={{ disabled: true }} />
            <ReferenceInput source="userId" reference="users" />
            <TextInput source="title" />
            <TextInput source="body" multiline rows={5}/>
        </SimpleForm>
    </Edit>
);