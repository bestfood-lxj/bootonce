import { DurableObject } from "cloudflare:workers";

export class Note extends DurableObject {
  // 构造函数：每次实例被创建或从休眠中恢复时都会执行
  // 通过这里的日志，可以观察实例何时被“唤醒”
  constructor(ctx, env) {
    super(ctx, env);
    console.log(`[constructor] 实例加载, id=${ctx.id.toString()}`);
  }

  // 阶段一：创建便签，并设置到期 alarm
  async create(text, ttlMs) {
    const now = Date.now();
    const note = {
      text,
      ttlMs,
      status: "active",
      expireAt: now + ttlMs,
      updatedAt: now,
    };
    await this.ctx.storage.put("note", note);
    await this.ctx.storage.setAlarm(note.expireAt);
    console.log(`[create] 已创建, ${ttlMs}ms 后到期`);
    return note;
  }

  // 读取当前数据
  async get() {
    return (await this.ctx.storage.get("note")) ?? null;
  }

  // 阶段二 & 阶段五：修改并保存
  // 如果便签已过期，则重新激活并重新设置 alarm
  async update(text) {
    const note = await this.ctx.storage.get("note");
    if (!note) throw new Error("便签不存在，请先创建");

    note.text = text;
    note.updatedAt = Date.now();

    if (note.status === "expired") {
      note.status = "active";
      note.expireAt = Date.now() + note.ttlMs;
      await this.ctx.storage.setAlarm(note.expireAt);
      console.log(`[update] 便签已过期，重新激活并设置新 alarm`);
    }

    await this.ctx.storage.put("note", note);
    console.log(`[update] 已保存 text="${text}"`);
    return note;
  }

  // 阶段四：alarm 到点时，系统自动调用这里
  // 即使实例当时处于休眠状态，系统也会先唤醒它再执行
  async alarm() {
    const note = await this.ctx.storage.get("note");
    if (!note) return;

    note.status = "expired";
    note.updatedAt = Date.now();
    await this.ctx.storage.put("note", note);
    console.log(`[alarm] 便签到期，状态改为 expired`);
  }
}

// Worker 入口：根据路径中的名字，把请求转发给对应的 DO 实例
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const parts = url.pathname.split("/").filter(Boolean); // ["n", "a", "create"]

    if (parts[0] !== "n" || !parts[1]) {
      return new Response("用法: /n/:name[/create|/update]", { status: 404 });
    }
    const name = parts[1];
    const action = parts[2];
    const stub = env.NOTE.getByName(name);

    if (request.method === "POST" && action === "create") {
      const { text, ttl } = await request.json();
      return Response.json(await stub.create(text, Number(ttl)));
    }
    if (request.method === "POST" && action === "update") {
      const { text } = await request.json();
      return Response.json(await stub.update(text));
    }
    if (request.method === "GET" && !action) {
      return Response.json(await stub.get());
    }
    return new Response("Not Found", { status: 404 });
  },
};