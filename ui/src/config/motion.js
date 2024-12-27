// 定义一个全局的弹簧动画过渡配置
export const transition = { type: "spring", duration: 0.8 };

// 定义一个滑动动画函数，根据滑动方向生成动画配置
export const slideAnimation = (direction) => {
  return {
    initial: {
      // 设置初始状态的x和y偏移量以及透明度
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
      // 定义初始状态的过渡效果，带有延迟
      transition: { ...transition, delay: 0.5 },
    },
    animate: {
      // 设置动画目标状态，重置x和y偏移量，完全显示
      x: 0,
      y: 0,
      opacity: 1,
      // 定义动画目标状态的过渡效果
      transition: { ...transition, delay: 0 },
    },
    exit: {
      // 设置退出状态的x和y偏移量
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      // 定义退出状态的过渡效果
      transition: { ...transition, delay: 0 },
    },
  };
};

// 定义一个渐隐渐现动画配置
export const fadeAnimation = {
  initial: {
    // 初始状态完全透明
    opacity: 0,
    // 定义初始状态的过渡效果，带有延迟
    transition: { ...transition, delay: 0.5 },
  },
  animate: {
    // 动画目标状态完全显示
    opacity: 1,
    // 定义动画目标状态的过渡效果
    transition: { ...transition, delay: 0 },
  },
  exit: {
    // 退出状态完全透明
    opacity: 0,
    // 定义退出状态的过渡效果
    transition: { ...transition, delay: 0 },
  },
};

// 定义标题文字的动画配置
export const headTextAnimation = {
  initial: { x: 100, opacity: 0 }, // 初始状态文字从右侧滑入，透明
  animate: { x: 0, opacity: 1 }, // 动画目标状态文字居中，完全显示
  transition: {
    type: "spring", // 使用弹簧动画类型
    damping: 5, // 动画阻尼
    stiffness: 40, // 动画弹性
    restDelta: 0.001, // 动画终止的阈值
    duration: 0.3, // 动画持续时间
  },
};

// 定义标题内容的动画配置
export const headContentAnimation = {
  initial: { y: 100, opacity: 0 }, // 初始状态文字从底部滑入，透明
  animate: { y: 0, opacity: 1 }, // 动画目标状态文字居中，完全显示
  transition: {
    type: "spring", // 使用弹簧动画类型
    damping: 7, // 动画阻尼
    stiffness: 30, // 动画弹性
    restDelta: 0.001, // 动画终止的阈值
    duration: 0.6, // 动画持续时间
    delay: 0.2, // 动画延迟时间
    delayChildren: 0.2, // 子动画延迟
  },
};

// 定义标题容器的动画配置
export const headContainerAnimation = {
  initial: {
    x: -100, // 初始状态容器从左侧滑入
    opacity: 0, // 容器透明
    transition: { ...transition, delay: 0.5 }, // 过渡效果带延迟
  },
  animate: {
    x: 0, // 动画目标状态容器居中
    opacity: 1, // 容器完全显示
    transition: { ...transition, delay: 0 }, // 过渡效果
  },
  exit: {
    x: -100, // 退出状态容器向左滑出
    opacity: 0, // 容器透明
    transition: { ...transition, delay: 0 }, // 过渡效果
  },
};
