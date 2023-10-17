import React, { useEffect, useRef } from "react";
// 引入three.js
import * as THREE from "three";
// 引入扩展库OrbitControls.js  相机控件
// @ts-ignore
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import styles from "@/pages/ThreeRender/index.module.less";
import { useSize } from "ahooks";

const BufferGeometry = () => {
  const divRef = useRef<any>();
  const size: any = useSize(divRef);

  const init = () => {
    const { width, height } = size;
    const scene = new THREE.Scene();

    //new THREE.Vector3()实例化一个三维向量对象
    const v3 = new THREE.Vector3(0, 0, 0);
    console.log("v3", v3);
    v3.set(10, 0, 0); //set方法设置向量的值
    v3.x = 100; //访问x、y或z属性改变某个分量的值

    // 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
    const camera = new THREE.PerspectiveCamera(30, width / height, 1, 2000);
    camera.position.set(600, 600, 600);
    camera.lookAt(0, 0, 0); //坐标原点
    const axesHelper = new THREE.AxesHelper(500);
    scene.add(axesHelper);

    //创建一个空的几何体对象
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.MeshBasicMaterial({
      color: 0x0000ff, //材质颜色
      side: THREE.FrontSide, //默认只有正面可见
    });
    const mesh = new THREE.Mesh(geometry, material); //点模型对象
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.render(scene, camera);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 10;
    controls.maxDistance = 700;
    controls.target.set(0, 1, 0);
    controls.update();
    // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
    controls.addEventListener("change", function () {
      renderer.render(scene, camera);
    });
    divRef.current.appendChild(renderer.domElement);
  };

  useEffect(() => {
    if (divRef.current && size) {
      init();
    }
  }, [divRef.current]);

  return (
    <div className={styles.view}>
      <div style={{ width: "100%" }} ref={divRef} />
    </div>
  );
};

export default BufferGeometry;
