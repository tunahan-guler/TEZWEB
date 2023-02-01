import React from "react";

type SearchModeProps = {
  ChilderenComponnent : JSX.Element
};

function SearchMode({ChilderenComponnent}: SearchModeProps) {
  return (
    <div className="p-16 sm:p-24 max-w-2xl">
       {ChilderenComponnent}  
    </div>
  )
}

export default SearchMode;
