import { InboxOutlined } from "@ant-design/icons";
import { UploadProps } from "antd";
import { message } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { FC } from "react";

const UploadRender: FC<any> = ({ setCurrent, current }) => {
  const props: UploadProps = {
    name: "file",
    multiple: false,
    onChange(info) {
      setCurrent(current + 1);
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined rev={undefined} />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">Drop your files here</p>
    </Dragger>
  );
};

export default UploadRender;
