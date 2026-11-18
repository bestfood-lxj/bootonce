#### 本地运行：

```bash
npx wrangler dev
```

#### 线上观察

```bash
npx wrangler deploy
npx wrangler tail     # 另开一个终端保持运行，实时查看日志
```

# 阶段一：创建实例
分别创建三个实例，TTL 设为 60 秒。
```bash
curl -X POST localhost:8787/n/a/create -H "Content-Type: application/json" -d '{"text":"A 的便签","ttl":60000}'
curl -X POST localhost:8787/n/b/create -H "Content-Type: application/json" -d '{"text":"B 的便签","ttl":60000}'
curl -X POST localhost:8787/n/c/create -H "Content-Type: application/json" -d '{"text":"C 的便签","ttl":120000}'
```

#

```bash

```

#

```bash

```