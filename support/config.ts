import { app } from "../app.ts";

export class Config {
    configs: any = {};

    async load() {
        let path = app().make("denova.path") + "/config";
        for (const dir of Deno.readDirSync(path)) {
            let config = await import("file:///" + path + "/" + dir.name);
            this.configs[dir.name.replace(".ts", "")] = config.default;
        }
    }

    get(name:string) {
        if (typeof this.configs[name] == 'undefined') return null;
        return this.configs[name];
    }
}