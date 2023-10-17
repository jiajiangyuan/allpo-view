import React, { useEffect, useRef, useState } from "react";
// 引入three.js
import * as THREE from "three";
// 引入扩展库OrbitControls.js  相机控件
// @ts-ignore
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// 引入扩展库GLTFLoader.js
// @ts-ignore
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
//引入性能监视器stats.js
// @ts-ignore
import Stats from "three/addons/libs/stats.module.js";
// 引入dat.gui.js的一个类GUI
// @ts-ignore
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
// 伽马校正后处理Shader
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader";
// ShaderPass功能：使用后处理Shader创建后处理通道
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";

// import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
// 引入渲染器通道RenderPass
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";

import { Object3D } from "three/src/core/Object3D";
import { Camera } from "three/src/cameras/Camera";
import styles from "../index.module.less";
import { useSize } from "ahooks";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh, Scene } from "three";

const ThreeRender = () => {
  const divRef = useRef<any>();
  const size: any = useSize(divRef);
  const [initRenderer, setRender] = useState<any>();
  const [scene, setScene] = useState<any>();
  const [camera, setCamera] = useState<any>();

  // // 定义相机输出画布的尺寸(单位:像素px)
  // const width = size?.width || 0; //宽度
  // const height = size?.height || 0; //高度

  // 初始化
  const init = () => {
    // 实例化一个gui对象
    const gui = new GUI();
    const scene = new THREE.Scene();
    const { width, height } = size;
    // 添加一个WebGL渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    setRender(renderer);

    // 创建GLTF加载器对象
    const loader = new GLTFLoader();

    loader.load(
      // "../src/pages/ThreeRender/gltf1/my_room_app.gltf",
      // "../src/pages/ThreeRender/gltf/global_illumination.gltf",
      // "../src/pages/ThreeRender/Geometry/global_verge3d.glb",
      "../src/pages/ThreeRender/Geometry/global_default.glb",
      function (gltf: GLTF) {
        console.log("控制台查看加载gltf文件返回的对象结构", gltf);
        console.log("gltf对象场景属性", gltf.scene);
        const camera = gltf.cameras[0];

        // 返回的场景对象gltf.scene插入到threejs场景中
        scene.add(gltf.scene);

        console.log(camera);

        gltf.scene.traverse(function (obj) {
          if (obj.isMesh) {
            // console.log(obj.material);
            // if (obj.material.metalness === 0) {
            //   obj.material = new THREE.MeshStandardMaterial({
            //     metalness: 1.0, //金属度属性
            //   });
            //
            // obj.frustumCulled = false;
            // //模型阴影
            // obj.castShadow = true;
            // //模型自发光
            // obj.material.emissive = obj.material.color;
            // obj.material.emissiveMap = obj.material.map;
          }
        });

        // AxesHelper：辅助观察的坐标系
        const axesHelper = new THREE.AxesHelper(size.width);
        scene.add(axesHelper); // 辅助观察的坐标系
        // const ambient = new THREE.AmbientLight(0xffffff, 0.4);
        // scene.add(ambient);
        // const pointLight = new THREE.PointLight(0xffffff, 1, 0, 0);
        // 光源辅助观察
        // const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
        // scene.add(pointLightHelper);

        // @ts-ignore
        lightRender(scene, gltf.scene.material, gui); // 光源设置

        //执行渲染操作
        renderer.render(scene, camera);
        divRef.current.appendChild(renderer.domElement);
        // 设置相机控件轨道控制器OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);
        // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
        controls.addEventListener("change", function () {
          renderer.render(scene, camera); //执行渲染操作
        }); //监听鼠标、键盘事件

        setScene(scene);
        setCamera(camera);
      }
    );
  };
  // 创建光源
  const lightRender = (scene: Scene, mesh: Mesh, gui: GUI) => {
    //点光源：两个参数分别表示光源颜色和光照强度
    // 参数1：0xffffff是纯白光,表示光源颜色
    // 参数2：1.0,表示光照强度，可以根据需要调整
    // const pointLight = new THREE.PointLight(0xffffff, 1.0, 0, 0);
    // // 设置点光源位置
    // pointLight.position.set(5000, 5000, 5000);
    // scene.add(pointLight); // 光源
    // // 点光源辅助观察PointLightHelper
    // const pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
    // scene.add(pointLightHelper); // 光源辅助

    // 平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
    directionalLight.position.set(80, 100, 50);
    scene.add(directionalLight);
    // DirectionalLightHelper：可视化平行光
    const dirLightHelper = new THREE.DirectionalLightHelper(
      directionalLight,
      5,
      0xff0000
    );
    scene.add(dirLightHelper);

    //环境光:没有特定方向，整体改变场景的光照明暗
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient); // 光源动画
    // 光照强度属性.intensity
    console.log("ambient.intensity", ambient.intensity);
    // 通过GUI改变mesh.position对象的xyz属性
    gui.add(ambient, "intensity", 0, 2.0).name("环境光强度").step(0.1);
    gui.add(directionalLight, "intensity", 0, 2.0).name("平行光源强度");
  };

  useEffect(() => {
    if (divRef.current && size) {
      init();
    }
  }, [divRef.current]);

  useEffect(() => {
    if (initRenderer) {
      const { width, height } = size;
      // 重置渲染器输出画布canvas尺寸
      initRenderer.setSize(width, height);
      // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
      camera.aspect = width / height;
      // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
      // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
      // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
      camera.updateProjectionMatrix();
      initRenderer.render(scene, camera); //执行渲染操作
    }
  }, [size]);

  return (
    <div className={styles.view}>
      <div style={{ width: "100%" }} ref={divRef} />
    </div>
  );
};

export default ThreeRender;
