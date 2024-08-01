import React, { ReactElement } from 'react';

type PropsTable = {
    className?: string;
    style?: React.CSSProperties | undefined;
    id?: string;
    caption?: string | ReactElement;
    children?: string | React.ReactNode;
    rowItems?: Array<Array<string | ReactElement | ICell | undefined | null>>;
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
interface ICell {
    id?: string;
    className?: string;
    style?: React.CSSProperties | undefined;
    content?: string | ReactElement;
    isVisible?: boolean;
}

declare class Table extends React.Component<PropsTable, any> {
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

declare class Column extends React.Component<PropsColumn, any> {
    constructor({ props }: {
        props: Readonly<PropsColumn>;
    });
}

export { Column, type ICell, type PropsColumn, type PropsTable, Table };
