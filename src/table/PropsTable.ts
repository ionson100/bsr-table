import React, {ReactElement} from "react";


export type RowProperty={
    onSelect?: () => {};
    color?:string;
    title?:string;
    CellItems:Array<string|number|boolean|ReactElement|ICell|undefined|null>
    style?: React.CSSProperties | undefined,
    className?: string;
    onClick?:()=>void
    id?:string
}


export type PropsTable = {
    className?: string;
    style?: React.CSSProperties | undefined,
    id?: string
    caption?:string|ReactElement;
    children?: string|React.ReactNode;
    rowItems:Array<Array<string|number|boolean|ReactElement|ICell|undefined|null>>|RowProperty[]
    onClickRow?:(id:string,index:number)=>void
    onClickColumn?:(id:string,index:number)=>void
    onClickCell?:(id:string,row:number,column:number)=>void
    useInnerHTML?:boolean
}
export type PropsColumn ={
    className?: string;
    style?: React.CSSProperties | undefined,
    children?:string|React.ReactNode;
}
export type PropsColumnGroups ={
    id?:string;
    className?: string;
    style?: React.CSSProperties | undefined,
    children?:string|React.ReactNode;
}

export type PropsHeaderGroups ={
    id?:string;
    title?:string|ReactElement
    className?: string;
    style?: React.CSSProperties | undefined,
    children?:string|React.ReactNode;
    eventKey?:string
    onClick?:(eventKey?:string)=>void
}
export interface ICell{
    id?:string
    className?:string
    style?: React.CSSProperties | undefined
    content?:string|ReactElement;
    rawContent?:string|ReactElement;
    isVisible?:boolean
}
