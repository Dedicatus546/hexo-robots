# hexo-robots

a hexo plugin that help you create robots.txt file when you build the site.

> This was forked from https://github.com/Dedicatus546/hexo-robots
> Now it supports empty `allow`, `disallow` and `sitemaps` directives.
> If for some reason you do not need to use them and do not need default values
> just put empty items. For example:

```yml
// hexo _config.yml
robots:
  user_agent: "*"
  allow:
  disallow:
  sitemaps:
```

## install

```bash
pnpm install hexo-robots
```

## config

the following is the default config when you install this plugin.

```yml
// hexo _config.yml
robots:
  user_agent: "*"
  allow:
    - /
    - /archives/
    - /page/
    - /schedule/
    - /tags/
  disallow:
    - /js/
    - /css/
    - /images/
  sitemaps:
```

if you have multi user_agent config you can use the following way:

```yml
robots:
  user_agent: "*"
  allow:
    - /
    - /archives/
    - /page/
    - /schedule/
    - /tags/
  disallow:
    - /js/
    - /css/
    - /images/
  sitemaps:
  more:
    - user_agent: "other_agent_name_1"
      allow:
        - /
        - /archives/
        - /page/
        - /schedule/
        - /tags/
      disallow:
        - /js/
        - /css/
        - /images/
    - user_agent: "other_agent_name_2"
      allow:
        - /
        - /archives/
        - /page/
        - /schedule/
        - /tags/
      disallow:
        - /js/
        - /css/
        - /images/ 
```
