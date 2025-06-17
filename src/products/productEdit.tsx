import { RichTextInput } from "ra-input-rich-text";
import {
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
  useRecordContext,
} from "react-admin";

const ProductTitle = () => {
  const record = useRecordContext();

  return <span>Product {record ? `${record.title}` : ""}</span>;
};

export const ProductEdit = () => (
  <Edit title={<ProductTitle />}>
    <SimpleForm>
      <TextInput source="name" label="商品名稱" />
      <NumberInput source="price" label="價格" />
      <NumberInput source="quantity" label="數量" />
      <RichTextInput source="description" label="商品描述（HTML 格式）" />
    </SimpleForm>
  </Edit>
);
