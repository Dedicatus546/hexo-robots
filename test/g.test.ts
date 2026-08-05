import { expect, test } from "vitest";
import { generateAll, HexoRobotsConfig } from "../src/core";

test("test nothing", () => {
  const robots: HexoRobotsConfig = {};
  expect(generateAll(robots, "\n")).toBe(``);
});

// _config.yml
//
// robots:
//   user_agent: *
//   allow: []
//   disallow: []
//   sitemaps: []
//
test("test array", () => {
  const robots: HexoRobotsConfig = {
    allow: [],
    disallow: [],
    sitemaps: [],
  };
  expect(generateAll(robots, "\n")).toBe(``);
});

// _config.yml
//
// robots:
//   user_agent:
//   allow:
//   disallow:
//   sitemaps:
//
test("test empty", () => {
  const robots: HexoRobotsConfig = {
    user_agent: null,
    allow: null,
    disallow: null,
    sitemaps: null,
  };
  expect(generateAll(robots, "\n")).toBe(``);
});

// _config.yml
//
// robots:
//   user_agent: *
//   allow: []
//   disallow: []
//   sitemaps: []
//
test("test truly", () => {
  const robots: HexoRobotsConfig = {
    user_agent: "*",
    allow: ["/"],
    disallow: ["/js/"],
    sitemaps: ["https://prohibitorum.top/sitemap.xml"],
  };
  expect(generateAll(robots, "\n")).toBe(`Sitemap: https://prohibitorum.top/sitemap.xml

User-agent: *
Allow: /
Disallow: /js/`);
});

// _config.yml
//
// robots:
//   sitemaps:
//     - https://prohibitorum.top/sitemap.xml
//     - https://prohibitorum.top/sitemap2.xml
//
test("only sitemap.", () => {
  const robots: HexoRobotsConfig = {
    sitemaps: ["https://prohibitorum.top/sitemap.xml", "https://prohibitorum.top/sitemap2.xml"],
  };
  expect(generateAll(robots, "\n")).toBe(`Sitemap: https://prohibitorum.top/sitemap.xml
Sitemap: https://prohibitorum.top/sitemap2.xml`);
});

// _config.yml
//
// robots:
//   user_agent: Googlebot
//
test("only user_agent.", () => {
  const robots: HexoRobotsConfig = {
    user_agent: "Googlebot",
  };
  expect(generateAll(robots, "\n")).toBe(`User-agent: Googlebot`);
});

// _config.yml
//
// robots:
//   allow:
//     - /js/
//     - /css/
//
test("only allow.", () => {
  const robots: HexoRobotsConfig = {
    allow: ["/js/", "/css/"],
  };
  expect(generateAll(robots, "\n")).toBe(`Allow: /js/
Allow: /css/`);
});

// _config.yml
//
// robots:
//   disallow:
//     - /js/
//     - /css/
//
test("only disallow.", () => {
  const robots: HexoRobotsConfig = {
    disallow: ["/js/", "/css/"],
  };
  expect(generateAll(robots, "\n")).toBe(`Disallow: /js/
Disallow: /css/`);
});

// _config.yml
//
// robots:
//   sitemaps:
//     - https://prohibitorum.top/sitemap.xml
//     - https://prohibitorum.top/sitemap2.xml
//   user_agent: *
//
test("test sitemaps + user_agent.", () => {
  const robots: HexoRobotsConfig = {
    sitemaps: ["https://prohibitorum.top/sitemap.xml", "https://prohibitorum.top/sitemap2.xml"],
    user_agent: "*",
  };
  expect(generateAll(robots, "\n")).toBe(`Sitemap: https://prohibitorum.top/sitemap.xml
Sitemap: https://prohibitorum.top/sitemap2.xml

User-agent: *`);
});

// _config.yml
//
// robots:
//   sitemaps:
//     - https://prohibitorum.top/sitemap.xml
//     - https://prohibitorum.top/sitemap2.xml
//   allow:
//     - /js/
//     - /css/
//
test("test sitemaps + allow.", () => {
  const robots: HexoRobotsConfig = {
    sitemaps: ["https://prohibitorum.top/sitemap.xml", "https://prohibitorum.top/sitemap2.xml"],
    allow: ["/js/", "/css/"],
  };
  expect(generateAll(robots, "\n")).toBe(`Sitemap: https://prohibitorum.top/sitemap.xml
Sitemap: https://prohibitorum.top/sitemap2.xml

Allow: /js/
Allow: /css/`);
});

// _config.yml
//
// robots:
//   sitemaps:
//     - https://prohibitorum.top/sitemap.xml
//     - https://prohibitorum.top/sitemap2.xml
//   disallow:
//     - /js/
//     - /css/
//
test("test sitemaps + disallow.", () => {
  const robots: HexoRobotsConfig = {
    sitemaps: ["https://prohibitorum.top/sitemap.xml", "https://prohibitorum.top/sitemap2.xml"],
    disallow: ["/js/", "/css/"],
  };
  expect(generateAll(robots, "\n")).toBe(`Sitemap: https://prohibitorum.top/sitemap.xml
Sitemap: https://prohibitorum.top/sitemap2.xml

Disallow: /js/
Disallow: /css/`);
});

// _config.yml
//
// robots:
//   more:
//     - user_agent: "Googlebot",
//       allow:
//         - /tmp1/
//         - /tmp2/
//       disallow:
//         - /tmp3/
//         - /tmp4/
//     - user_agent: "Bingbot",
//       allow:
//         - /tmp5/
//         - /tmp6/
//       disallow:
//         - /tmp7/
//         - /tmp8/
//
test("test more.", () => {
  const robots: HexoRobotsConfig = {
    more: [
      {
        user_agent: "Googlebot",
        allow: ["/tmp1/", "/tmp2/"],
        disallow: ["/tmp3/", "/tmp4/"],
      },
      {
        user_agent: "Bingbot",
        allow: ["/tmp5/", "/tmp6/"],
        disallow: ["/tmp7/", "/tmp8/"],
      },
    ],
  };
  expect(generateAll(robots, "\n")).toBe(`User-agent: Googlebot
Allow: /tmp1/
Allow: /tmp2/
Disallow: /tmp3/
Disallow: /tmp4/

User-agent: Bingbot
Allow: /tmp5/
Allow: /tmp6/
Disallow: /tmp7/
Disallow: /tmp8/`);
});

// _config.yml
//
// robots:
//   sitemaps:
//     - https://prohibitorum.top/sitemap.xml
//     - https://prohibitorum.top/sitemap2.xml
//   more:
//     - user_agent: "Googlebot",
//       allow:
//         - /tmp1/
//         - /tmp2/
//       disallow:
//         - /tmp3/
//         - /tmp4/
//     - user_agent: "Bingbot",
//       allow:
//         - /tmp5/
//         - /tmp6/
//       disallow:
//         - /tmp7/
//         - /tmp8/
//
test("test sitemap + more.", () => {
  const robots: HexoRobotsConfig = {
    sitemaps: ["https://prohibitorum.top/sitemap.xml", "https://prohibitorum.top/sitemap2.xml"],
    more: [
      {
        user_agent: "Googlebot",
        allow: ["/tmp1/", "/tmp2/"],
        disallow: ["/tmp3/", "/tmp4/"],
      },
      {
        user_agent: "Bingbot",
        allow: ["/tmp5/", "/tmp6/"],
        disallow: ["/tmp7/", "/tmp8/"],
      },
    ],
  };
  expect(generateAll(robots, "\n")).toBe(`Sitemap: https://prohibitorum.top/sitemap.xml
Sitemap: https://prohibitorum.top/sitemap2.xml

User-agent: Googlebot
Allow: /tmp1/
Allow: /tmp2/
Disallow: /tmp3/
Disallow: /tmp4/

User-agent: Bingbot
Allow: /tmp5/
Allow: /tmp6/
Disallow: /tmp7/
Disallow: /tmp8/`);
});