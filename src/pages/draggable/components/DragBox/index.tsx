import type { CSSProperties, FC } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../IDraggable";
import styles from "./index.module.less";
import React, { lazy } from "react";
import { typeRender } from "@/pages/draggable/docuSign/LeftRight/typeList";
import { DragPreviewDiv } from "@/pages/draggable/components/DragBox/Div";

export interface BoxProps {
  item: any;
}

const Box: FC<BoxProps> = function Box({ item }) {
  console.log(item);
  const [{ opacity, isDragging }, drag, preview] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: item,
    end: (item, monitor) => {
      const dropResult = monitor.getInitialClientOffset();
      // return <div>111</div>;
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  }));

  return (
    <>
      <DragPreviewDiv connect={preview} />
      <div
        ref={drag}
        style={{ opacity }}
        className={styles.box}
        data-testid={`box`}
      >
        <div className={styles.icon}>{typeRender(item.type)}</div>
        <div className={styles.text}>{item.title}</div>
      </div>
    </>
  );
};

export default Box;
