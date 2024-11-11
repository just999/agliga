import React, { useState, useEffect } from 'react';

const EditableCell = ({
  getValue,
  row: { index },
  column: { id },
  table,
}: any) => {
  const initialValue = getValue() as any;
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      value={value as string}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
  );
};

export default EditableCell;
