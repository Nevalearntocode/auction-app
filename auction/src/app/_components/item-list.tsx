import React from "react";

type Props = {};

const ItemList = (props: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Item List</h2>
      <div className="grid grid-cols-4 gap-4">
        <div className="flex rounded-xl border p-8">something</div>
        <div className="flex rounded-xl border p-8">something</div>
        <div className="flex rounded-xl border p-8">something</div>
        <div className="flex rounded-xl border p-8">something</div>
      </div>
    </div>
  );
};

export default ItemList;
