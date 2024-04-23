import React from "react";
import { Input } from "../../ui/input";

interface DialogInputProps {
  name: string;
  value: string;
  type: "input" | "date";
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  taskCreatorRole: string;
  userRole: string;
}

const DialogInput: React.FC<DialogInputProps> = (props) => {
  return (
    <div>
      <label className="description">{props.name}</label>
      <Input
        type={props.type}
        className="shad-input"
        style={{ borderWidth: "4px" }}
        value={props.value}
        onChange={props.onChange}
        disabled={
          props.userRole === "Manager" && props.taskCreatorRole === "Supervisor"
            ? true
            : false
        }
      />
    </div>
  );
};

export default DialogInput;
