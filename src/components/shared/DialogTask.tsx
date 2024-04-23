import { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Context } from "../..";
import Loader from "./Loader";
import { Empty, priorityList, statusList } from "../../lib/const";
import {
  dateConverter,
  shortName,
  taskDialogValidation,
} from "../../lib/utils";
import { Button } from "../ui/button";
import { Toaster, toast } from "sonner";
import DialogInput from "./dialog/DialogInput";
import DialogTextarea from "./dialog/DialogTextarea";
import DialogSelect from "./dialog/DialogSelect";
import { ITasks } from "../../lib/types";
import { Label } from "@radix-ui/react-label";

type Props = {
  type: "create" | "update";
  task?: ITasks | undefined;
};

const DialogTask: React.FC<Props> = ({ type, task }: Props) => {
  const { store } = useContext(Context);

  const [state, setState] = useState({
    header: "",
    description: "",
    priority: "",
    status: "",
    responsible: "",
    deadline: "",
    creator: store.user.id,
  });

  const fetchTaskClick = (task: ITasks | undefined) => {
    if (task !== Empty || task !== undefined) {
      setState({
        ...state,
        ...task!,
        deadline: dateConverter(task?.deadline!),
        responsible: task?.responsible.id,
      });
    }
  };

  const saveClick = async () => {
    try {
      console.log(state);
      if (taskDialogValidation(Object.values(state))) {
        await store.createTasks(state);
      } else {
        toast.error("Заполните все поля!", {
          duration: 2000,
          position: "top-center",
        });
      }
    } catch (e: any) {
      toast.error(e, {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  const deleteClick = async () => {
    try {
      await store.deleteTasks(task?.id!);
    } catch (e) {
      toast.error("Ошибка удаления!", {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  if (store.isLoading) {
    return <Loader />;
  }

  return (
    <Dialog>
      <Toaster
        toastOptions={{
          classNames: { toast: "pl-5 h-10", error: "bg-red" },
        }}
      />
      <DialogTrigger
        className="shad-button_dark_4 p-3 rounded-md"
        onClick={(e) => {
          task !== Empty ? fetchTaskClick(task) : console.log();
        }}
      >
        {type === "create" ? "Создать задачу" : "Открыть"}
      </DialogTrigger>
      <DialogContent className="bg-black">
        <DialogHeader>
          <DialogInput
            name="Заголовок"
            value={state.header}
            type="input"
            onChange={(e) => setState({ ...state, header: e.target.value })}
            taskCreatorRole={task?.creator.role}
            userRole={store.user.role}
          />
        </DialogHeader>
        <DialogTextarea
          name="Описание"
          value={state.description}
          onChange={(e) => setState({ ...state, description: e.target.value })}
          taskCreatorRole={task?.creator.role}
          userRole={store.user.role}
        />
        <DialogInput
          name="Дата окончания"
          type="date"
          value={state.deadline}
          onChange={(e) => setState({ ...state, deadline: e.target.value })}
          taskCreatorRole={task?.creator.role}
          userRole={store.user.role}
        />
        <DialogSelect
          defaultValue={state.priority}
          name="Приоритет"
          value={state.priority}
          onChange={(e) => setState({ ...state, priority: e.target.value })}
          options={priorityList}
          taskCreatorRole={task?.creator.role}
          userRole={store.user.role}
        />
        <DialogSelect
          defaultValue={state.status}
          name="Статус"
          value={state.status}
          onChange={(e) => setState({ ...state, status: e.target.value })}
          options={statusList}
          taskCreatorRole={task?.creator.role}
          userRole="Supervisor"
        />
        <div className="flex flex-col">
          <Label className="description">Ответственный</Label>
          <select
            defaultValue={state.responsible}
            onChange={(e) =>
              setState({ ...state, responsible: e.target.value })
            }
            className="h-10 rounded-md pl-2"
            style={{ backgroundColor: "#1f1f22", borderWidth: "1px" }}
            disabled={
              task?.creator.role === "Supervisor" &&
              store.user.role === "Manager"
                ? true
                : false
            }
          >
            <option value={""}></option>
            {store.users.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {shortName(user.fullName)}
                </option>
              );
            })}
          </select>
        </div>
        {type === "create" ? (
          <div className="flex justify-center">
            <Button className="shad-button_dark_4" onClick={saveClick}>
              Сохранить
            </Button>
          </div>
        ) : (
          <div className="flex justify-between">
            <Button className="shad-button_primary" onClick={saveClick}>
              Сохранить
            </Button>
            <Button className="shad-button_primary" onClick={deleteClick}>
              Удалить
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogTask;
