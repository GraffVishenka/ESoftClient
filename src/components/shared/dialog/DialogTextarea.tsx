import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";

interface DialogTextareaProps {
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  role?: string;
  taskCreatorRole: string;
  userRole: string;
}

const DialogTextarea = (props: DialogTextareaProps) => {
  return (
    <div>
      <Label className="description">{props.name}</Label>
      <Textarea
        style={{ backgroundColor: "#1f1f22" }}
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

export default DialogTextarea;
