import { Page } from "react-pdf";
import styles from "@/pages/draggable/docuSign/RightRender/index.module.less";
import React, { FC, useEffect, useRef, useState } from "react";
import { useDrop, XYCoord } from "react-dnd";
import { DragItem, ItemTypes } from "@/pages/draggable/IDraggable";
import { useInViewport } from "ahooks";
const DropPage: FC<{
  id: string | number;
  index: number;
  moveBox: (key: string | null, data: any) => void;
  scale: number;
  onClose: () => void;
}> = ({ id, index, moveBox, scale, onClose }) => {
  const pageRef = useRef<any>();
  const [position, setPosition] = useState({
    left: 0,
    top: 0,
  });

  // 拖拽逻辑
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item: DragItem, monitor) {
        // 返回拖动源组件根DOM节点的投影｛x，y｝客户端偏移量，该偏移量基于当前拖动操作开始时的位置以及移动差异。如果没有拖动任何项目，则返回null。
        const d1 = monitor.getSourceClientOffset() as XYCoord;
        const dropDiv = document.querySelector(`.dropDiv-${id}`);
        const rightView = document.querySelector("#rightView");
        const position = getPoint(dropDiv);

        const top = parseInt(
          // @ts-ignore
          String(d1.y - position.top + rightView?.scrollTop)
        );
        const left = parseInt(String(d1.x - position.left));
        console.log(top, left);
        console.log(item);

        moveBox(null, {
          ...item,
          left,
          top,
          id:
            new Date().getTime() +
            "-" +
            parseInt(String(Math.random() * 10000)),
          parentId: index,
        });
        return {
          name: `dropDiv-${id}`,
          allowedDropEffect: `dropDiv-${id}`,
        };
      },
    }),
    [moveBox, position]
  );

  //获取某元素以浏览器左上角为原点的坐标
  const getPoint = (obj: any) => {
    var t = obj.offsetTop; //获取该元素对应父容器的上边距
    var l = obj.offsetLeft; //对应父容器的上边距
    //判断是否有父容器，如果存在则累加其边距
    while ((obj = obj.offsetParent)) {
      //等效 obj = obj.offsetParent;while (obj != undefined)
      t += obj.offsetTop; //叠加父容器的上边距
      l += obj.offsetLeft; //叠加父容器的左边距
    }

    return { top: t, left: l };
  };

  return (
    <div ref={drop} className={`dropDiv-${id}`} onClick={onClose}>
      <Page
        ref={pageRef}
        className={styles.page}
        width={595}
        height={841}
        pageNumber={index + 1}
        scale={scale}
        renderTextLayer={false}
      />
    </div>
  );
};

export default DropPage;
