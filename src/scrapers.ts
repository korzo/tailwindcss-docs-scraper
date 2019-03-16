import cheerio from "cheerio";
import {DocClasses, MenuItem} from "./types";

export const menuScraper = (content: string): MenuItem[] => {
    let items: MenuItem[] = [];
    let $ = cheerio.load(content);
    $("#sidebar li > a").each((i, e) => {
        let item = cheerio(e);
        items.push({
            link: item.attr("href"),
            label: item.text()
        });
    });

    return items;
};

export const tableScraper = (content: string): DocClasses[] => {
    const items: DocClasses[] = [];
    let $ = cheerio.load(content);

    $(".table-collapse tbody").find("tr").each((i, e) => {
        let tds = cheerio(e).find("td");
        let name = tds.eq(0).text().trim();
        let property = tds.eq(1).text().trim().replace(/\n/g, "<br>");

        if(name && property) {
            items.push({name, property});
        }
    });

    return items;
};