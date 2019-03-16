import {resolve} from "path";
import {docItemFactory, selectedItems} from "./src";
import {fileLoader, sleep} from "./src/helpers";
import {menuScraper} from "./src/scrapers";
import {IDocItem} from "./src/types";
import fs from "fs";
import rimraf from "rimraf";

if(process.argv.length < 3) {
    console.log("Missing parameter");
    process.exit();
}

const generate = async () => {
    const basePath = resolve(__dirname, "pages/");
    const factory = docItemFactory(basePath);
    const loadFile = fileLoader(basePath);
    const menus = menuScraper(await loadFile("https://tailwindcss.com/docs/what-is-tailwind/", "index"));
    const docs: IDocItem[] = [];

    for (let i = 0; i < selectedItems.length; i++) {
        let current = menus.filter(e => e.label === selectedItems[i])[0];
        console.log("Proccessed " + current.label);
        docs.push(await factory(current.label, current.link));
        await sleep(1);
    }

    await fs.promises.writeFile(resolve(__dirname, "docs/data.json"), JSON.stringify(docs, null, 4), "utf8");
    console.log("DONE");
};

const clear = () => {
    rimraf(resolve(__dirname, "pages/*.html"), (err) => {
        if(err) {
            console.log("Error: " + err.message);
            return;
        }
        console.log("Directory cleared");
    });
};

switch (process.argv[2]) {
    case "generate":
        generate().catch(err => {
            console.log(`Process failed: ${err.message}`);
            console.error(err);
        });
        break;
    case "clear":
        clear();
        break;
    default:
        console.log("Invalid parameter: " + process.argv[2]);
}