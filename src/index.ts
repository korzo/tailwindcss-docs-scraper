import {IDocItem} from "./types";
import {tableScraper} from "./scrapers";
import {fileLoader, filenameFromLabel} from "./helpers";

export const selectedItems = [

    "Display",
    "Floats",
    "Object Fit",
    "Object Position",
    "Overflow",
    "Position",
    "Visibility",
    "Z-Index",
    "Color",
    "Font Family",
    "Font Size",
    "Font Weight",
    "Letter Spacing",
    "Line Height",
    "Lists",
    "Style & Decoration",
    "Text Alignment",
    "Vertical Alignment",
    "Whitespace & Wrapping",
    "Background Attachment",
    "Background Color",
    "Background Position",
    "Background Repeat",
    "Background Size",
    "Border Color",
    "Border Style",
    "Border Radius",
    "Display",
    "Flex Direction",
    "Flex Wrapping",
    "Align Items",
    "Align Content",
    "Align Self",
    "Justify Content",
    "Flex, Grow, & Shrink",
    "Width",
    "Min-Width",
    "Max-Width",
    "Height",
    "Min-Height",
    "Max-Height",
    "Border Collapse",
    "Table Layout",
    "Box Shadow",
    "Opacity",
    "Appearance",
    "Cursor",
    "Outline",
    "Pointer Events",
    "Resize",
    "User Select",
    "Fill & Stroke",
];

export const docItemFactory = (basePath: string) => {
    const loadFile = fileLoader(basePath);

    return async (label: string, url: string): Promise<IDocItem> => {
        let classes = tableScraper(await loadFile(url, filenameFromLabel(label)));
        
        return {
            name: label,
            classes
        };
    };
};