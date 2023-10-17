import styles from "./index.module.less";
import Box from "@/pages/draggable/components/DragBox";
import React, { useState } from "react";
import _ from "lodash";
import { Divider } from "antd";

const LeftRight = () => {
  const [data, setData] = useState([
    {
      type: "signature",
      title: "Signature",
      width: 100,
      height: 50,
      minWidth: 100,
      minHeight: 50,
      fontSize: 14,
      color: "black",
      enableResizing: true,
      lockAspectRatio: true,
      value: "Signature",
    },
    {
      type: "initial",
      title: "Initial",
      width: 75,
      height: 85,
      minWidth: 75,
      minHeight: 85,
      fontSize: 14,
      color: "black",
      enableResizing: true,
      lockAspectRatio: true,
      value: "Initial",
    },
    {
      type: "dateSigned",
      title: "Date Signed",
      width: "auto",
      height: "auto",
      fontSize: 12,
      color: "black",
      enableResizing: false,
      lockAspectRatio: true,
      value: "Date Signed",
    },
  ]);
  const [data1, setData1] = useState([
    {
      type: "user",
      title: "Purchaser: Lei Bo",
      width: "auto",
      height: "auto",
      fontSize: 12,
      color: "black",
      enableResizing: false,
      value: "Lei Bo",
    },
    {
      type: "user",
      title: "Purchaser: Jack",
      width: "auto",
      height: "auto",
      fontSize: 12,
      color: "black",
      enableResizing: false,
      value: "Jack",
    },
    {
      type: "email",
      title: "Email",
      width: "auto",
      height: "auto",
      fontSize: 12,
      color: "black",
      enableResizing: false,
      lockAspectRatio: true,
      value: "Jack@gmail.com",
    },
    {
      type: "lot",
      title: "Lot: 304",
      width: "auto",
      height: "auto",
      fontSize: 12,
      color: "black",
      enableResizing: false,
      value: "304",
    },
  ]);
  const [data2, setData2] = useState([
    {
      type: "text",
      title: "Text",
      width: 74,
      height: "auto",
      fontSize: 12,
      color: "black",
      enableResizing: true,
      lockAspectRatio: false,
      value: "Text",
    },
    {
      type: "number",
      title: "Number",
      width: "auto",
      height: "auto",
      fontSize: 12,
      color: "black",
      enableResizing: true,
      lockAspectRatio: false,
      value: 0,
    },
  ]);

  return (
    <div className={styles.left}>
      <div className={styles.leftTitle}>Standard Fields</div>
      {_.map(data, (item) => {
        return <Box key={item.type} item={item} />;
      })}
      <Divider />
      {_.map(data1, (item, index) => {
        return <Box key={index} item={item} />;
      })}
      <Divider />
      {_.map(data2, (item, index) => {
        return <Box key={index} item={item} />;
      })}
    </div>
  );
};

export default LeftRight;
