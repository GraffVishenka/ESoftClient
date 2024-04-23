import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { IUser } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shortName = (fullName: string) => {
  let full = fullName;
  const a = full.split(" ");
  let shortName = a[0] + " ";
  for (let i = 1; i < a.length; i++) {
    let name = a[i].charAt(0) + ". ";
    shortName += name;
  }
  return shortName;
};

export const taskDialogValidation = (task: Array<string | number>) => {
  let count = 0;
  for (let i = 0; i < task.length; i++) {
    if (task[i] === "") {
      count++;
    }
  }
  if (count > 0) {
    return false;
  }
  return true;
};

export const usersListConvertator = (users: IUser[]) => {
  let usersNames = "";
  let usersIds = "";
  for (let i = 0; i < users.length; i++) {
    usersNames += shortName(users[i].fullName);
    usersIds += users[i].id;
  }

  const namesArr = usersNames.trimEnd().split(" ");
  const idsArr = usersIds.split("");
  const newUsersNames = [];
  const newUsersIds = [];
  for (let i = 0; i < namesArr.length; i += 3) {
    const names = namesArr[i] + " " + namesArr[i + 1] + " " + namesArr[i + 2];
    newUsersNames.push(names);
  }
  for (let i = 0; i < idsArr.length; i++) {
    newUsersIds.push(idsArr[i]);
  }

  return { newUsersNames, idsArr };
};

export const dateConverter = (date: string) => {
  return new Date(date).toLocaleDateString().split(".").reverse().join("-");
};
