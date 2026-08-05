# v1.0.3

- remove all default config, now if you write a empty `robots:` , it will generate a empty robots.txt.
- if there is not `robots:` in `_config.yml` , robots.txt would not generate.
- empty value like `user_agent: `, `allow: ` would be ignored.