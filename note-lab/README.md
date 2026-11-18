#### 本地运行：

```bash
npx wrangler dev
```

#### 线上观察

```bash
npx wrangler deploy
npx wrangler tail     # 另开一个终端保持运行，实时查看日志
```
---
下面的命令中，localhost:8787 在部署后请换成你的 *.workers.dev 地址。
---

# 阶段一：创建实例
分别创建三个实例，TTL 设为 60 秒。
```bash
curl -X POST localhost:8787/n/a/create -H "Content-Type: application/json" -d '{"text":"A 的便签","ttl":60000}'
curl -X POST localhost:8787/n/b/create -H "Content-Type: application/json" -d '{"text":"B 的便签","ttl":60000}'
curl -X POST localhost:8787/n/c/create -H "Content-Type: application/json" -d '{"text":"C 的便签","ttl":120000}'
```

# 阶段二：读取并修改保存

```bash
curl localhost:8787/n/a
curl -X POST localhost:8787/n/a/update -H "Content-Type: application/json" -d '{"text":"A 修改后的内容"}'
curl localhost:8787/n/a
```

# 阶段三：休眠等待

```bash
curl localhost:8787/n/b
```

# 阶段四：Alarm 触发

```bash
curl localhost:8787/n/b
```

# 阶段五：修改并再次保存

```bash
curl -X POST localhost:8787/n/a/update -H "Content-Type: application/json" -d '{"text":"A 过期后重新编辑"}'
curl localhost:8787/n/a
```