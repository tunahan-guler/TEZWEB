

type CreateOrUpdateModeProps = {
  ChilderenComponnent : JSX.Element
};

function CreateOrUpdateMode({ChilderenComponnent}: CreateOrUpdateModeProps) {
  return (
    <div className="p-16 sm:p-24 max-w-2xl">
      {ChilderenComponnent}
    </div>)
}

export default CreateOrUpdateMode;
