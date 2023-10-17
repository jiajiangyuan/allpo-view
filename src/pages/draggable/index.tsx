import styles from "./index.module.less";
import React, { useState } from "react";
import { Steps } from "antd";
import DocuSign from "@/pages/draggable/docuSign";
import UploadRender from "./uploadRender";

const DraggableHome = () => {
  const [current, setCurrent] = useState(0);

  const steps = [
    {
      title: "Upload a Document",
      content: <UploadRender current={current} setCurrent={setCurrent} />,
    },
    {
      title: "DocuSign",
      content: <DocuSign />,
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div className={styles.view}>
      <Steps
        current={current}
        items={[
          {
            title: "Upload a Document",
          },
          {
            title: "DocuSign",
          },
        ]}
      />
      <div className={styles.content}>{steps[current].content}</div>
    </div>
  );
};

export default DraggableHome;
