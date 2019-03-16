
export interface IDocItem {
    name: string;
    classes: DocClasses[];
}

export type DocClasses = {
    name: string,
    property: string
}

export type MenuItem = {
    label: string,
    link: string
}