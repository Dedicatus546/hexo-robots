import { generateAll } from "./core";

hexo.extend.generator.register("robots", () => {
  const config = hexo.config.robots;
  if (config === undefined) {
    return;
  }

  if (config === null) {
    return {
      path: "robots.txt",
      data: "",
    };
  }

  return {
    path: "robots.txt",
    data: generateAll(config),
  };
});