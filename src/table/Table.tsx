import React, {Children} from "react";
import {ICell, PropsColumn, PropsTable} from "./PropsTable";
import {v4 as uuidv4} from 'uuid';
import {ParseString} from "./utils";

export class Table extends React.Component<PropsTable, any> {
    private list: Array<PropsColumn> = []
    private id?: string;


    constructor({props}: { props: Readonly<PropsTable> }) {
        super(props);
        this.cellClick = this.cellClick.bind(this)


    }

    innerRender() {
        this.id = this.props.id ?? uuidv4()
        if (Children) {
            this.list = [];
            Children.map(this.props.children, (d) => {
                this.list!.push({
                    style: (d as any).props.style,
                    className: (d as any).props.className,
                    children: (d as any).props.children,
                })
            })
        }


    }

    columnClick(column: number) {

        if(this.props.onClickColumn){
            this.props.onClickColumn(this.id!,column)
        }
    }

    cellClick(row: number, column: number) {
        if (this.props.onClickCell) {
            this.props.onClickCell(this.id!, row, column)
        }
    }

    rowClick(row: number) {
        if (this.props.onClickRow) {
            this.props.onClickRow(this.id!, row)
        }
    }
    public Refresh(callback:()=>void){
        this.forceUpdate(callback)
    }
    componentDidMount() {
    }


    render() {
        this.innerRender()
        return (

            <table style={this.props.style} is={this.props.id} className={this.props.className}>
                {!this.props.caption ? null : (
                    <caption>
                        {
                            this.props.caption
                        }
                    </caption>


                )}
                <tbody>
                <tr>
                    {
                        this.list.map((c, index) => {
                            return <th
                                onClick={this.columnClick.bind(this,index)}
                                key={"col_"+index}
                                className={c.className}
                                style={c.style}>{c.children}
                            </th>
                        })
                    }
                </tr>
                {
                    this.props.rowItems?.map((row, indexR) => {
                        return (

                            <tr key={"row" + indexR}
                                onClick={this.rowClick.bind(this, indexR)}
                                data-row-id={this.id + "_" + indexR}>
                                {
                                    row.map((cell, indexC) => {
                                        if(cell){
                                            if (typeof cell === 'string') {
                                                return (<td
                                                    onClick={this.cellClick.bind(this, indexR, indexC)}
                                                    key={indexR + '-' + indexC}>{ParseString(cell, this.props.useInnerHTML)}
                                                </td>)
                                            } else if (React.isValidElement(cell)) {
                                                return (<td
                                                    onClick={this.cellClick.bind(this, indexR, indexC)}
                                                    key={indexR + '-' + indexC}>{cell}
                                                </td>)
                                            } else {
                                                const iCell = cell as ICell
                                                if (iCell.isVisible) {
                                                    return (<td
                                                        onClick={this.cellClick.bind(this, indexR, indexC)}
                                                        id={iCell.id}
                                                        style={iCell.style}
                                                        className={iCell.className}
                                                        key={indexR + '-' + indexC}>{iCell.content}</td>)
                                                } else {
                                                    return null;
                                                }
                                            }
                                        }


                                    })
                                }
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        )
            ;
    }

}
