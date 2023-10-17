import styles from "@/pages/draggable/index.module.less";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import LeftRight from "@/pages/draggable/docuSign/LeftRight";
import RightRender from "@/pages/draggable/docuSign/RightRender";
import React, { useState } from "react";

const DocuSign = () => {
  const [scale, setScale] = useState(1);
  return (
    <div>
      <div className={styles.top}></div>
      <DndProvider backend={HTML5Backend}>
        <div className={["example", styles.example].join(" ")}>
          <LeftRight />
          <RightRender />
        </div>
      </DndProvider>
    </div>
  );
};

export default DocuSign;
