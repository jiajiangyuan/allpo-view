import React, { useEffect, useRef, useState } from "react";
// 引入three.js
import * as THREE from "three";
// 引入扩展库OrbitControls.js  相机控件
// @ts-ignore
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// 引入dat.gui.js的一个类GUI
// @ts-ignore
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

// 引入gltf模型加载库GLTFLoader.js
// @ts-ignore
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// // 伽马校正后处理Shader
// import { GammaCorrectionShader } from "three/addons/shaders/GammaCorrectionShader.js";
// // ShaderPass功能：使用后处理Shader创建后处理通道
// import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
//
// import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
// // 引入渲染器通道RenderPass
// import { RenderPass } from "three/addons/postprocessing/RenderPass.js";

// 引入扩展库GLTFLoader.js
//引入性能监视器stats.js
// @ts-ignore
import Stats from "three/addons/libs/stats.module.js";
import { Object3D } from "three/src/core/Object3D";
import { Camera } from "three/src/cameras/Camera";
import { Slider } from "antd";
import styles from "./index.module.less";
import { useSize } from "ahooks";
import {
  CircleGeometry,
  Mesh,
  MeshLambertMaterial,
  Object3DEventMap,
  Scene,
} from "three";

const ThreeRender = () => {
  const divRef = useRef<any>();
  const size: any = useSize(divRef);
  const [initRenderer, setRender] = useState<any>();
  const [scene, setScene] = useState<any>();
  const [camera, setCamera] = useState<any>();

  // 初始化
  const init = () => {
    // 实例化一个gui对象
    const gui = new GUI();
    const scene = new THREE.Scene();
    const camera = cameraDateRender(); // 相机设置
    const mesh = materialRender(scene, gui); // 模型设置

    //改变交互界面style属性
    gui.domElement.style.right = "50px";
    gui.domElement.style.top = "120px";
    gui.domElement.style.width = "300px";

    lightRender(scene, mesh, gui); // 光源设置
    axesHelper(scene); // 辅助坐标系
    webGlRender(scene, camera, mesh, gui); // 执行渲染
    // forRender(scene); // 随机渲染模型

    setScene(scene);
    setCamera(camera);
  };
  // 循环创建模型
  const forRender = (scene: THREE.Scene) => {
    const geometry = new THREE.BoxGeometry(7, 7, 7);
    const material = new THREE.MeshLambertMaterial({
      color: 0x00ffff,
    });

    // for循环创建一列模型
    for (let i = 0; i < 10; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      // 沿着x轴分布
      mesh.position.set(i * 30, 0, 0);
      scene.add(mesh); //网格模型添加到场景中
    }

    // 双层for循环创建阵列模型
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        // 在XOZ平面上分布
        mesh.position.set(i * 30, 0, j * 20);
        scene.add(mesh); //网格模型添加到场景中
      }
    }
  };
  // 辅助观察的坐标系
  const axesHelper = (scene: THREE.Scene) => {
    // AxesHelper：辅助观察的坐标系
    const axesHelper = new THREE.AxesHelper(500);
    scene.add(axesHelper); // 辅助观察的坐标系
  };
  // 创建模型
  const materialRender = (scene: THREE.Scene, gui: GUI) => {
    //创建一个长方体几何对象Geometry
    // const geometry = new THREE.BoxGeometry(100, 100, 100);

    // //BoxGeometry：长方体
    const geometry = new THREE.BoxGeometry(100, 100, 100);
    // // SphereGeometry：球体
    // const geometry = new THREE.SphereGeometry(50);
    // // CylinderGeometry：圆柱
    // const geometry = new THREE.CylinderGeometry(50, 50, 100);
    // // PlaneGeometry：矩形平面
    // const geometry = new THREE.PlaneGeometry(100, 50);
    // CircleGeometry：圆形平面
    // const geometry = new THREE.CircleGeometry(50);

    //创建一个材质对象Material
    //MeshBasicMaterial不受光照影响
    //MeshLambertMaterial受光照影响
    // const material = new THREE.MeshBasicMaterial({
    //   color: 0x0000ff, //设置材质颜色
    //   transparent: true, //开启透明
    //   opacity: 0.5, //设置透明度
    // });

    // 对于矩形平面PlaneGeometry、圆形平面如果你想看到两面，可以设置side: THREE.DoubleSide。
    // const material = new THREE.MeshLambertMaterial({
    //   color: 0x00ffff, //设置材质颜色
    //   // side: THREE.FrontSide, //默认只有正面可见
    //   // side: THREE.DoubleSide, //两面可见
    // });

    // 模拟镜面反射，产生一个高光效果
    const material = new THREE.MeshPhongMaterial({
      color: 0x00ffff,
      shininess: 20, //高光部分的亮度，默认30
      specular: 0x444444, //高光部分的颜色
    });

    // 两个参数分别为几何体geometry、材质material
    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh

    //设置网格模型在三维空间中的位置坐标，默认是坐标原点
    mesh.position.set(200, 200, 200);
    scene.add(mesh); // 添加模型
    gui.add(mesh.position, "x", 0, 2000);
    gui.add(mesh.position, "y", 0, 2000);
    gui.add(mesh.position, "z", 0, 2000);

    const obj = {
      color: 0x00ffff, // 材质颜色
    };
    // // 创建材质子菜单
    const matFolder = gui.addFolder("材质");
    // // 材质颜色color
    matFolder.addColor(obj, "color").onChange(function (value: any) {
      // @ts-ignore
      mesh.color.set(value);
    });
    // 材质高光颜色specular
    // matFolder.addColor(obj, "specular").onChange(function (value) {
    //   // material.specular.set(value);
    // });

    return mesh;
  };
  // 设置相机
  const cameraDateRender = () => {
    const { width, height } = size;
    // 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
    const camera = new THREE.PerspectiveCamera(30, width / height, 1, 5000);
    //相机在Three.js三维坐标系中的位置
    // camera.position.set(200, 200, 200);
    camera.position.set(2000, 2000, 2000);
    //相机观察目标指向Threejs 3D空间中某个位置
    camera.lookAt(0, 0, 0); //坐标原点

    return camera;
  };
  // 创建光源
  const lightRender = (scene: Scene, mesh: Mesh, gui: GUI) => {
    //点光源：两个参数分别表示光源颜色和光照强度
    // 参数1：0xffffff是纯白光,表示光源颜色
    // 参数2：1.0,表示光照强度，可以根据需要调整
    const pointLight = new THREE.PointLight(0xffffff, 1.0, 0, 0);
    // 设置点光源位置
    pointLight.position.set(900, 600, 500);
    scene.add(pointLight); // 光源
    // 点光源辅助观察PointLightHelper
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
    scene.add(pointLightHelper); // 光源辅助

    //环境光:没有特定方向，整体改变场景的光照明暗
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient); // 光源动画

    // 环境光子菜单
    const ambientFolder = gui.addFolder("环境光");
    // 通过GUI改变mesh.position对象的xyz属性
    ambientFolder
      .add(ambient, "intensity", 0, 2.0)
      .name("环境光强度")
      .step(0.1);
    ambientFolder.add(pointLight, "intensity", 0, 2.0).name("点光源强度");
  };

  // 旋转动画
  const animation = (
    scene: THREE.Scene,
    camera: THREE.Camera,
    renderer: THREE.WebGLRenderer,
    mesh: THREE.Mesh
  ) => {
    // 渲染循环
    // const clock = new THREE.Clock();
    //创建stats对象
    const stats = new Stats();
    //stats.domElement:web页面上输出计算结果,一个div元素，
    divRef.current.appendChild(stats.domElement);

    const render = () => {
      // const spt = clock.getDelta() * 1000; //毫秒
      // console.log('两帧渲染时间间隔(毫秒)', spt);
      // console.log('帧率FPS', 1000 / spt);
      //requestAnimationFrame循环调用的函数中调用方法update(),来刷新时间
      stats.update();
      renderer.render(scene, camera); //执行渲染操作
      mesh.rotateY(0.01); //每次绕y轴旋转0.01弧度
      requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
    };
    render();
  };

  // WebGL渲染器
  const webGlRender = (
    scene: THREE.Scene,
    camera: Camera,
    mesh: THREE.Mesh,
    gui: GUI
  ) => {
    const { width, height } = size;
    // 添加一个WebGL渲染器
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    // 获取你屏幕对应的设备像素比.devicePixelRatio告诉threejs,以免渲染模糊问题
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    //执行渲染操作
    renderer.render(scene, camera);
    setRender(renderer);
    divRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 200;
    controls.maxDistance = 1000;
    controls.target.set(0, 1, 0);
    controls.update();
    // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
    controls.addEventListener("change", function () {
      renderer.render(scene, camera); //执行渲染操作
    }); //监听鼠标、键盘事件

    // 如果GUI改变了参数，重新调用渲染器渲染三维场景
    gui.onChange((v: any) => {
      renderer.render(scene, camera); //执行渲染操作
    });

    // 动画渲染
    // animation(scene, camera, renderer, mesh);
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
