import React from "react";

type ReadModeProps = {
  ChilderenComponnent : JSX.Element
};

function ReadMode({ChilderenComponnent}: ReadModeProps) {
  return (
    <div className="p-16 sm:p-24 max-w-2xl">
       {ChilderenComponnent}  
    </div>
  )
}

export default ReadMode;
