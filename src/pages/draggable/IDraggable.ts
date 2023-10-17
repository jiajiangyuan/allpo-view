import { ResizeEnable } from "react-rnd";

export interface DragItem {
  type: string;
  id: string;
  top: number;
  left: number;
  name?: any;
}

export const ItemTypes = {
  BOX: "box",
};

export interface BoxObject {
  parentId: number;
  id: string;
  top: number;
  left: number;
  title: string;
  width: number;
  height: number;
  url: any;
  fontSize: number;
  minWidth: number;
  minHeight: number;
  enableResizing: ResizeEnable;
  type: string;
  value: string;
  lockAspectRatio: boolean;
}
