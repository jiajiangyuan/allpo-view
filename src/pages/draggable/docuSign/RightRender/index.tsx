import React, { FC, useCallback, useRef, useState } from "react";
import { Document, pdfjs } from "react-pdf";
import styles from "./index.module.less";
import PdfFile from "./demo.pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import _ from "lodash";
import DropPage from "@/pages/draggable/components/DropPage";
import { Rnd } from "react-rnd";
import { BoxObject } from "@/pages/draggable/IDraggable";
import DrawerModal from "@/pages/draggable/components/DrawerModal";
import ContentEditable from "react-contenteditable";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const options = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  cMapPacked: false,
};

const RightRender: FC<{}> = () => {
  const drawerRef = useRef();
  const [boxes, setBoxes] = useState<BoxObject[]>([]);
  const [numPages, setNumPages] = useState<number>(1);
  const [scale, setScale] = useState(1);
  const [selectId, setSelectId] = useState<any>();

  // 更新标签
  const moveBox = useCallback(
    (id: string | null, data: any) => {
      setBoxes((v) => {
        if (id == null) {
          setSelectId(data.id);
          v.push(data);
          return _.map(v, (item) => item);
        }
        return _.map(v, (item, index) => {
          if (item.id === id) {
            return {
              ...item,
              ...data,
            };
          }
          return item;
        });
      });
    },
    [boxes, setBoxes]
  );

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const valueRender = (type: string, item: BoxObject) => {
    switch (type) {
      case "email":
        return (
          <div
            className={styles.text}
            style={{
              fontSize: item.fontSize,
              lineHeight: `${item.fontSize}px`,
            }}
          >
            {item.value}
          </div>
        );
      case "text":
        return (
          <ContentEditable
            className={styles.editText}
            style={{
              width: item.width,
              height: "100%",
            }}
            html={item.value}
            onChange={(value) => {
              moveBox(item.id, {
                value: value.target.value,
              });
            }}
          />
        );
      case "number":
        return (
          <ContentEditable
            className={styles.editText}
            disabled={false}
            style={{
              width: item.width,
              height: "100%",
            }}
            html={JSON.stringify(item.value)}
            onChange={(value) => {
              moveBox(item.id, {
                value: value.target.value,
              });
            }}
          />
        );
      default:
        return (
          <div
            className={styles.text}
            style={{
              fontSize: item.fontSize,
              lineHeight: `${item.fontSize}px`,
            }}
          >
            {item.value}
          </div>
        );
    }
  };

  return (
    <div className={styles.right} id={"rightView"}>
      <Document
        file={PdfFile}
        onLoadSuccess={onDocumentLoadSuccess}
        options={options}
        renderMode={"canvas"}
        className={styles.document}
      >
        {_.map(Array.from({ length: numPages }), (item, index) => {
          const newFilter = _.filter(boxes, (list) => list.parentId === index);
          return (
            <div
              style={{ position: "relative" }}
              key={index}
              className={`parent-${index}`}
            >
              {_.map(newFilter, (item) => {
                const {
                  type,
                  left,
                  top,
                  width,
                  height,
                  id,
                  fontSize,
                  minWidth,
                  minHeight,
                  enableResizing,
                  lockAspectRatio,
                } = item;
                return (
                  <Rnd
                    key={id}
                    scale={scale}
                    minHeight={minHeight}
                    minWidth={minWidth}
                    lockAspectRatio={lockAspectRatio}
                    className={[
                      selectId === id && styles.rndAction,
                      styles.rnd,
                    ].join(" ")}
                    size={{ width, height }}
                    position={{ x: left, y: top }}
                    onDragStop={(e, data) => {
                      moveBox(id, {
                        left: data.x,
                        top: data.y,
                      });
                    }}
                    onResize={(e, direction, ref, delta, position) => {
                      setSelectId(id);
                      const fontSizeNum =
                        item.type === "text"
                          ? fontSize
                          : (ref.offsetWidth / width) * fontSize;

                      moveBox(id, {
                        width: ref.offsetWidth,
                        height: ref.offsetHeight,
                        fontSize: fontSizeNum,
                      });
                    }}
                    bounds={`.dropDiv-${item.parentId}`}
                    allowAnyClick={false}
                    onClick={() => setSelectId(id)}
                    onDragStart={() => setSelectId(id)}
                    enableResizing={enableResizing}
                  >
                    {valueRender(type, item)}
                  </Rnd>
                );
              })}
              <DropPage
                onClose={() => setSelectId(null)}
                id={JSON.stringify(index)}
                key={JSON.stringify(index)}
                index={index}
                moveBox={moveBox}
                scale={scale}
              />
            </div>
          );
        })}
      </Document>
      <DrawerModal
        ref={drawerRef}
        boxes={boxes}
        selectId={selectId}
        setBoxes={setBoxes}
        setSelectId={setSelectId}
        moveBox={moveBox}
      />
    </div>
  );
};

export default RightRender;
