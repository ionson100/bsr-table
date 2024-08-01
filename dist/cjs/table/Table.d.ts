import React from "react";
import { PropsTable } from "./PropsTable";
export declare class Table extends React.Component<PropsTable, any> {
    private list;
    private id?;
    constructor({ props }: {
        props: Readonly<PropsTable>;
    });
    innerRender(): void;
    columnClick(column: number): void;
    cellClick(row: number, column: number): void;
    rowClick(row: number): void;
    Refresh(callback: () => void): void;
    componentDidMount(): void;
    render(): React.JSX.Element;
}
