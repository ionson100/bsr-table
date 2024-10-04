import React, { ReactElement } from 'react';

type RowProperty = {
    onSelect?: () => {};
    color?: string;
    title?: string;
    CellItems: Array<string | number | boolean | ReactElement | ICell | undefined | null>;
    style?: React.CSSProperties | undefined;
    className?: string;
    onClick?: () => void;
    id?: string;
};
type PropsTable = {
    className?: string;
    style?: React.CSSProperties | undefined;
    id?: string;
    caption?: string | ReactElement;
    children?: string | React.ReactNode;
    rowItems: Array<Array<string | number | boolean | ReactElement | ICell | undefined | null>> | RowProperty[];
    onClickRow?: (id: string, index: number) => void;
    onClickColumn?: (id: string, index: number) => void;
    onClickCell?: (id: string, row: number, column: number) => void;
    useInnerHTML?: boolean;
};
type PropsColumn = {
    className?: string;
    style?: React.CSSProperties | undefined;
    children?: string | React.ReactNode;
};
type PropsColumnGroups = {
    id?: string;
    className?: string;
    style?: React.CSSProperties | undefined;
    children?: string | React.ReactNode;
};
type PropsHeaderGroups = {
    id?: string;
    title?: string | ReactElement;
    className?: string;
    style?: React.CSSProperties | undefined;
    children?: string | React.ReactNode;
    eventKey?: string;
    onClick?: (eventKey?: string) => void;
};
interface ICell {
    id?: string;
    className?: string;
    style?: React.CSSProperties | undefined;
    content?: string | ReactElement;
    rawContent?: string | ReactElement;
    isVisible?: boolean;
}

declare class Table extends React.Component<PropsTable, any> {
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

declare class Column extends React.Component<PropsColumn, any> {
    constructor({ props }: {
        props: Readonly<PropsColumn>;
    });
    render(): undefined;
}

declare class ColumnGroup extends React.Component<PropsColumnGroups, any> {
    constructor({ props }: {
        props: Readonly<PropsColumnGroups>;
    });
    render(): undefined;
}

declare class HeaderGroup extends React.Component<PropsHeaderGroups, any> {
    constructor({ props }: {
        props: Readonly<PropsHeaderGroups>;
    });
    render(): undefined;
}

export { Column, ColumnGroup, HeaderGroup, type ICell, type PropsColumn, type PropsTable, type RowProperty, Table };
