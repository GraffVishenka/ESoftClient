import { Label } from "../../ui/label";

interface DialogSelectProps {
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: Array<string>;
  defaultValue: string;
  taskCreatorRole: string;
  userRole: string;
}

const DialogSelect = (props: DialogSelectProps) => {
  return (
    <div className="flex flex-col">
      <Label className="description">{props.name}</Label>
      <select
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        className="h-10 rounded-md pl-2"
        style={{ backgroundColor: "#1f1f22", borderWidth: "1px" }}
        disabled={
          props.userRole === "Manager" &&
          props.taskCreatorRole === "Supervisor"
            ? true
            : false
        }
      >
        <option value=""></option>
        {props.options.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DialogSelect;
