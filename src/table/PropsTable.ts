import React, {ReactElement} from "react";



export type PropsTable = {
    className?: string;
    style?: React.CSSProperties | undefined,
    id?: string
    caption?:string|ReactElement;
    children?: React.ReactNode;
    rowItems?:Array<Array<string|ReactElement|ICell|undefined|null>>
    onClickRow?:(id:string,index:number)=>void
    onClickColumn?:(index:number)=>void
    useInnerHTML?:boolean
}
export type PropsColumn ={
    className?: string;
    style?: React.CSSProperties | undefined,
    children?:string|React.ReactNode;




}
export interface ICell{
    id?:string
    className?:string
    style?: React.CSSProperties | undefined
    content?:string|ReactElement;
    isVisible?:boolean
}
