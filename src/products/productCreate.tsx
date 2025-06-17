import { Create, SimpleForm, TextInput, NumberInput } from "react-admin";
import { RichTextInput } from "ra-input-rich-text";

const ProductCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="商品名稱" />
      <NumberInput source="price" label="價格" />
      <NumberInput source="quantity" label="數量" />
      <RichTextInput source="description" label="商品描述（HTML 格式）" />
    </SimpleForm>
  </Create>
);

export default ProductCreate;
