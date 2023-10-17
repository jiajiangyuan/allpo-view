import React, {
  FC,
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Button, Col, Drawer, Form, Input, InputNumber, Select } from "antd";
import _ from "lodash";
import { Divider } from "antd";
import styles from "./index.module.less";

const DrawerModal: FC<{
  boxes: any;
  selectId: any;
  setBoxes: (data: any) => void;
  setSelectId: (data: any) => void;
  moveBox: (id: string, data: any) => void;
  ref: ForwardedRef<any>;
}> = forwardRef(({ setBoxes, setSelectId, moveBox, selectId, boxes }, ref) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>();

  useEffect(() => {
    setOpen(!!selectId);
    if (selectId) {
      const find = _.find(boxes, (item) => item.id === selectId);
      setData(find);
      form.setFieldsValue({
        ...find,
      });
    }
  }, [selectId, JSON.stringify(boxes)]);

  // 删除对应元素
  const deleteDom = (id: string) => {
    setBoxes((v: any) => {
      return _.filter(v, (item) => item.id !== id);
    });
    setSelectId(null);
  };

  const onClose = () => {
    setSelectId(null);
  };

  useImperativeHandle(ref, () => ({
    setOpen: (flag?: any) => {
      setOpen(!!flag);
    },
  }));

  return (
    <Drawer
      placement={"right"}
      width={300}
      onClose={onClose}
      open={open}
      mask={false}
      closeIcon={false}
      title={data?.title}
    >
      <Form
        form={form}
        onValuesChange={(changedValues, values) => {
          console.log(values);
          moveBox(selectId, {
            ...values,
          });
        }}
      >
        {data?.type === "text" && (
          <Col span={24}>
            <div className={styles.title}>Add Text</div>
            <Form.Item name={"value"}>
              <Input.TextArea rows={4} maxLength={4000} />
            </Form.Item>
            <Divider />
          </Col>
        )}

        {(!data?.enableResizing || data?.type === "text") && (
          <Col span={24}>
            <div className={styles.title}>Formatting</div>
            <Form.Item name={"fontSize"} label={"Font Size"}>
              <InputNumber min={12} max={72} />
            </Form.Item>
            <Form.Item name={"color"} label={"Color"}>
              <Select
                options={[
                  { value: "black", label: "Black" },
                  { value: "white", label: "white" },
                  { value: "navy", label: "Navy" },
                  { value: "purple", label: "Purple" },
                ]}
              />
            </Form.Item>
            <Divider />
          </Col>
        )}

        {(!data?.enableResizing || data?.type === "number") && (
          <Col span={24}>
            <div className={styles.title}>Number</div>
            <Form.Item name={"value"} label={"Number Format"}>
              <InputNumber />
            </Form.Item>
            <Divider />
          </Col>
        )}

        <Col span={24}>
          <div className={styles.title}>Location</div>
          <Form.Item name={"left"} label={"Pixels from Left"}>
            <InputNumber />
          </Form.Item>
          <Form.Item name={"top"} label={"Pixels from Top"}>
            <InputNumber />
          </Form.Item>
          <Divider />
        </Col>

        <Button danger onClick={() => deleteDom(selectId)}>
          DELETE
        </Button>
      </Form>
    </Drawer>
  );
});

export default DrawerModal;
