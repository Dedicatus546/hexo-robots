const os = require("node:os");

const defaultRobots = Object.freeze({
  user_agent: "*",
  allow: ["/", "/page/", "/archives/", "/schedule/", "/tags/"],
  disallow: ["/js/", "/css/", "/images/"],
  sitemaps: [""],
});

hexo.config.robots = Object.assign({}, defaultRobots, hexo.config.robots);

if (Array.isArray(hexo.config.robots.more)) {
  hexo.config.robots.more.forEach((item, index, array) => {
    array[index] = Object.assign({}, defaultRobots, item);
  });
}

const output = (robots) => {
  const { user_agent, allow, disallow, sitemaps } = robots;
  return [
    `User-agent: ${user_agent}`,
    "",
    ...allow.map((item) => `Allow: ${item}`),
    "",
    ...disallow.map((item) => `Disallow: ${item}`),
    "",
    ...sitemaps.map((item) => `Sitemap: ${item}`),
  ].join(os.EOL);
};

hexo.extend.generator.register("robots", function (locals) {
  const { config } = this;
  const { robots } = config;
  let data = output(robots);
  if (robots.more) {
    data +=
      os.EOL +
      os.EOL +
      robots.more.map((item) => output(item)).join(os.EOL + os.EOL);
  }
  return {
    path: "robots.txt",
    data,
  };
});
