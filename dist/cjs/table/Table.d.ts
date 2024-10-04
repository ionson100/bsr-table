import React from "react";
import { PropsTable } from "./PropsTable";
export declare class Table extends React.Component<PropsTable, any> {
    private list;
    private id?;
    private listGroup;
    private listHeaderGroup;
    constructor({ props }: {
        props: Readonly<PropsTable>;
    });
    innerRender(): void;
    private innerParserProps;
    columnClick(column: number): void;
    cellClick(row: number, column: number): void;
    rowClick(row: number): void;
    Refresh(callback: () => void): void;
    renderHeaderGroup(): React.JSX.Element | null | undefined;
    private renderItemList;
    private renderItemRowProperty;
    private renderTd;
    render(): React.JSX.Element;
}
