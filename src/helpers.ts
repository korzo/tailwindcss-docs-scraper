import {resolve} from "path";
import fs from "fs";
import axios from "axios";

export const fileLoader = (baseDir: string) => {
    return async(url: string, fileName: string) => {
        let file = resolve(baseDir, fileName + ".html");

        try {
            return await fs.promises.readFile(file, "utf8");
        } catch (e) {
            let res = await axios.get(url);
            await fs.promises.writeFile(file, res.data, "utf8");
            return res.data;
        }
    };
};

export const filenameFromLabel = (label: string): string => {
    return label
        .toLocaleLowerCase()
        .replace(/[&, ]/g, "-")
        .replace(/-+/g, "-"); // collapse -
};

export const sleep = (seconds: number) => {
    return new Promise((res) => {
        setTimeout(res, seconds * 1000);
    });
};