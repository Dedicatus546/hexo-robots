import { EOL } from "node:os";

interface HexoRobotsBaseConfig {
  user_agent?: string | null;
  allow?: Array<string> | null;
  disallow?: Array<string> | null;
}

export interface HexoRobotsConfig extends HexoRobotsBaseConfig {
  sitemaps?: Array<string> | null;
  more?: Array<HexoRobotsBaseConfig> | null;
}

/**
 * @param eol for test
 */
const generate = (config: HexoRobotsBaseConfig, eol = EOL) => {
  const { user_agent, allow, disallow } = config;

  const result: Array<string> = [];
  if (user_agent) {
    result.push(`User-agent: ${user_agent}`);
  }
  if (allow && allow.length > 0) {
    result.push(...allow.map((item) => `Allow: ${item}`));
  }
  if (disallow && disallow.length > 0) {
    result.push(...disallow.map((item) => `Disallow: ${item}`));
  }

  return result.join(eol);
};

export const generateAll = (config: HexoRobotsConfig, eol = EOL) => {
  const result: Array<string> = [];
  const { sitemaps } = config;
  if (sitemaps && sitemaps.length > 0) {
    result.push(sitemaps.map((item) => `Sitemap: ${item}`).join(eol));
  }
  const base = generate(config, eol);
  if (base) {
    result.push(base);
  }
  if (config.more) {
    config.more.forEach((item) => {
      const moreItem = generate(item, eol);
      if (moreItem) {
        result.push(moreItem);
      }
    });
  }
  return result.join(eol + eol);
};