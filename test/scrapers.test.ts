import {resolve} from "path";
import {fileLoader, filenameFromLabel} from "../src/helpers";
import {menuScraper, tableScraper} from "../src/scrapers";
import {assert} from "chai";
import {DocClasses} from "../src/types";

const eq = assert.strictEqual;
let basePath = resolve(__dirname, "../pages/");

const loadFile = fileLoader(basePath);

describe("Scrapers", () => {

    describe("Menu", () => {
        let content: string;

        before(async () => {
            content = await loadFile("https://tailwindcss.com/docs/display/", "display");
        });

        it('should find all menu items', function () {
            const menuItems = menuScraper(content);
            eq(menuItems.length, 72);
        });

        it('links should match', function () {
            const menuItems = menuScraper(content);
            eq(menuItems.filter(e => e.label === "Display")[0].link, "https://tailwindcss.com/docs/display");
            eq(menuItems.filter(e => e.label === "Color")[0].link, "https://tailwindcss.com/docs/text-color");
            eq(menuItems.filter(e => e.label === "Z-Index")[0].link, "https://tailwindcss.com/docs/z-index");
        });
    });

    describe("Table scraper", () => {
        it('should find table', async () => {
          let content = await loadFile("https://tailwindcss.com/docs/z-index", "z-index");
          let items: DocClasses[] = tableScraper(content);
          eq(items.length, 7);
          eq(items[0].name, ".z-0");
          eq(items[6].name, ".z-auto");
          eq(items[6].property, "z-index: auto;");
          eq(items[0].property, "z-index: 0;");
        });
    });
});

describe("filenameFromLabel", () => {
    it('should replace space with dash', function () {
        eq(filenameFromLabel("Font Family"), "font-family");
    });

    it('should replace special chars with dash', function () {
        eq(filenameFromLabel("Flex, Grow, & Shrink"), "flex-grow-shrink");
    });
});