import React, { lazy } from "react";
import { UserOutlined } from "@ant-design/icons";

const Layouts = lazy(() => import("@/layouts/index")); // 公共页容器
const Draggable = lazy(() => import("@/pages/draggable/index")); // 在线签署
const ThreeRender = lazy(() => import("@/pages/ThreeRender/index")); // 3d楼书
const ThreeGltfRender = lazy(
  () => import("@/pages/ThreeRender/Geometry/index")
); // 3d楼书
const BufferGeometry = lazy(() => import("@/pages/ThreeRender/BufferGeometry"));

export type RoutesType = {
  icon?: React.ReactNode;
  path?: string; // 地址
  label?: string; // 菜单名称
  children?: RoutesType[];
  element?: React.ReactNode; // 渲染模版
  hideMenu?: boolean; // 是否显示到菜单中
  from?: string;
  to?: string; // 跳转地址
  index?: boolean;
};

export const routes: RoutesType[] = [
  {
    path: "/",
    element: <Layouts />,
    // icon: <UserOutlined />,
    label: "首页",
    children: [
      {
        from: "/",
        to: "/draggable",
      },
      {
        path: "/draggable",
        label: "DocuSign",
        element: <Draggable />,
      },
      // {
      //   path: "/threeJs",
      //   label: "3D楼书",
      //   children: [
      //     {
      //       path: "/threeJs/home",
      //       label: "home",
      //       element: <ThreeRender />,
      //     },
      //     {
      //       path: "/threeJs/gltf",
      //       label: "gltf",
      //       element: <ThreeGltfRender />,
      //     },
      //     {
      //       path: "/threeJs/bufferGeometry",
      //       label: "BufferGeometry",
      //       element: <BufferGeometry />,
      //     },
      //   ],
      // },
    ],
  },
  {
    path: "/404",
    label: "未找到页面",
    element: <div>404</div>,
    hideMenu: true,
  },
  {
    from: "*",
    to: "/404",
    hideMenu: true,
  },
];
