import React from "react";
import ItemForm from "./_components/item-form";

type Props = {};

const CreateItemPage = (props: Props) => {
  return (
    <main className="container mx-auto my-12 flex flex-col gap-8">
      <ItemForm />
    </main>
  );
};

export default CreateItemPage;
