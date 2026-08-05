# hexo-robots

a hexo plugin that help you create robots.txt file when you build the site.

## install

```bash
pnpm install hexo-robots
```

## enable

you should write the following config in _config.yml

```yml
# enable it, will generate a empty robots.txt file.
robots: 
```

**if you just install it. it would generate nothing.**

## config

you can setting `user_agent`, `allow`, `disallow`, `sitemaps`. 

```yml
// hexo _config.yml
robots:
  user_agent: "*"
  allow:
    - /tags/
  disallow:
    - /js/
  sitemaps:
    - https://prohibitorum.top/sitemap.xml
```

generate:

```txt
Sitemap: https://prohibitorum.top/sitemap.xml

User-agent: *
Allow: /
Disallow: /tags/
```

if you have multi user_agent config you can use the following way:

```yml
robots:
  sitemaps:
    - https://prohibitorum.top/sitemap.xml
  user_agent: "*"
  allow:
    - /tags/
  disallow:
    - /js/
  more:
    - user_agent: Googlebot
      allow:
        - /tmp1/
      disallow:
        - /tmp2/
    - user_agent: Bingbot
      allow:
        - /tmp3/
      disallow:
        - /tmp4/
```

generate:

```txt
Sitemap: https://prohibitorum.top/sitemap.xml

User-agent: *
Allow: /tags/
Disallow: /js/

User-agent: Googlebot
Allow: /tmp1/
Disallow: /tmp2/

User-agent: Bingbot
Allow: /tmp3/
Disallow: /tmp4/
```
