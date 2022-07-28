import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import tw from "twin.macro";

const SearchContainer = tw.div`
  mb-8
  flex
  items-center
`;

const Input = tw.input`
  h-8
  border-2
  border-solid
  border-purple-600
  outline-none
  p-4
  rounded-lg
  bg-light-bg
  dark:text-white
  dark:bg-dark-bg
  dark:border-green-400
`;

export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);

  return (
    <SearchContainer>
      
      <Input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`🔍 ${count} contests...  `}
      />
    </SearchContainer>
  );
}