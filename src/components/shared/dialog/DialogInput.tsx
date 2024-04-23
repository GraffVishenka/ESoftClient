import React from "react";
import { Input } from "../../ui/input";

interface DialogInputProps {
  name: string;
  value: string;
  type: "input" | "date";
  onChange: React.ChangeEventHandler<HTMLInputElement> ;
}

const DialogInput: React.FC<DialogInputProps> = ( props ) => {
  return (
    <div>
      <label className="description">{props.name}</label>
        <Input
          type={props.type}
          className="shad-input"
          style={{ borderWidth: "4px" }}
          value={props.value}
          onChange={props.onChange}
        />
    </div>
  );
};

export default DialogInput;
