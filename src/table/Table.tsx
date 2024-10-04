import React, {Children} from "react";
import {ICell, PropsColumn, PropsTable, RowProperty} from "./PropsTable";
import {v4 as uuidv4} from 'uuid';
import {ParseString} from "./utils";
import {ColumnGroup} from "./ColumnGroup";
import {HeaderGroup} from "./HeaderGroup";


type colGroupType = {
    className?: string;
    style?: React.CSSProperties | undefined,
    span?: number;
    id?: string;
}
type headerGroupType = {
    className?: string;
    style?: React.CSSProperties | undefined,
    colspan?: number;
    title?: string
    id?: string;
    eventKey?: string;
    onClick?: (eventKey?: string) => void
}


export class Table extends React.Component<PropsTable, any> {
    private list: Array<PropsColumn> = []
    private id?: string;
    private listGroup: Array<colGroupType> = [];
    private listHeaderGroup: Array<headerGroupType> = [];


    constructor({props}: { props: Readonly<PropsTable> }) {
        super(props);
        this.cellClick = this.cellClick.bind(this)


    }

    innerRender() {

        this.id = this.props.id ?? uuidv4()
        if (Children) {
            this.list = [];
            this.listGroup = [];
            this.listHeaderGroup = [];
            Children.map(this.props.children, (d) => {
                const element = d as React.ReactElement<any>
                if (element.type === HeaderGroup) {

                    const header: headerGroupType = {
                        className: element.props.className,
                        style: element.props.style,
                        title: element.props.title,
                        id: element.props.id,
                        eventKey: element.props.eventKey,
                        onClick: element.props.onClick,
                        colspan: 0
                    }

                    Children.map(element.props.children, (ff) => {
                        this.innerParserProps(ff, header);
                    })
                    if (header.colspan && header.colspan > 0) {
                        this.listHeaderGroup.push(header)
                    }


                } else {
                    const header = {
                        colspan: 0
                    }
                    this.innerParserProps(d, header);
                    for (let i = 0; i < header.colspan; i++) {
                        this.listHeaderGroup.push({})
                    }
                }


            })
        }


    }

    private innerParserProps(d: any, header?: headerGroupType) {

        const element = d as React.ReactElement<any>

        if (element.type === ColumnGroup) {
            Children.map(element.props.children, (col) => {
                this.list.push({
                    style: col.props.style,
                    className: col.props.className,
                    children: col.props.children,
                })
            })
            this.listGroup.push({
                id: element.props.id,
                className: element.props.className,
                style: element.props.style,
                span: React.Children.count(element.props.children)
            })
            if (header) {
                header.colspan! += React.Children.count(element.props.children);
            }
        } else {

            this.listGroup.push({})
            this.list!.push({
                style: element.props.style,
                className: element.props.className,
                children: element.props.children,
            })
            if (header) {
                header.colspan! += 1;// React.Children.count((d as any).props.children);
            }
        }
    }

    columnClick(column: number) {

        if (this.props.onClickColumn) {
            this.props.onClickColumn(this.id!, column)
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

    public Refresh(callback: () => void) {
        this.forceUpdate(callback)
    }

    renderHeaderGroup() {

        if (this.listHeaderGroup.length > 0) {
            if (this.listHeaderGroup.filter(a => a.colspan !== undefined).length > 0) {
                return <tr>
                    {
                        this.listHeaderGroup.map((g, index) => {
                            if (g.colspan) {
                                return <th key={'c7' + index}
                                           onClick={() => {
                                               if (g.onClick) {
                                                   g.onClick(g.eventKey)
                                               }
                                           }}
                                           style={g.style} className={g.className} id={g.id}
                                           colSpan={g.colspan}>{g.title} </th>
                            } else {
                                return <th></th>
                            }
                        })
                    }

                </tr>
            }
        } else {
            return null;
        }

    }


    private renderItemList(row: (string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | ICell | null | undefined)[], index: number) {
        return (

            <tr key={"row" + index}
                onClick={this.rowClick.bind(this, index)}
                data-row-id={this.id + "_" + index}>
                {
                    row.map((cell, indexC) => {
                        if (cell) {
                            if (typeof cell === 'string') {
                                return (<td
                                    onClick={this.cellClick.bind(this, index, indexC)}
                                    key={index + '-' + indexC}>{ParseString(cell, this.props.useInnerHTML)}
                                </td>)
                            } else if (typeof cell === 'boolean' || typeof cell === 'number') {

                                return (<td
                                    onClick={this.cellClick.bind(this, index, indexC)}
                                    key={index + '-' + indexC}>{`${cell}`}
                                </td>)
                            } else if (React.isValidElement(cell)) {
                                return (<td
                                    onClick={this.cellClick.bind(this, index, indexC)}
                                    key={index + '-' + indexC}>{cell}
                                </td>)
                            } else {
                                const iCell = cell as ICell
                                if (iCell.isVisible) {
                                    return iCell.rawContent ? (iCell.rawContent) : (
                                        (<td
                                            onClick={this.cellClick.bind(this, index, indexC)}
                                            id={iCell.id}
                                            style={iCell.style}
                                            className={iCell.className}
                                            key={index + '-' + indexC}>{iCell.content}</td>)
                                    )
                                } else {
                                    return null;
                                }
                            }
                        } else {
                            return <td></td>
                        }


                    })
                }
            </tr>
        )
    }

    private renderItemRowProperty(props: RowProperty, index: number) {

        const row = props.rowItems


        return (

            <tr
                key={"row" + index}
                onSelect={props.onSelect}
                id={props.id}
                className={props.className}
                style={props.style}
                title={props.title}
                color={props.color}
                onClick={props.onClick}
                data-row-id={this.id + "_" + index}>
                {
                    row.map((cell, indexC) => {

                        if (cell) {

                            if (typeof cell === 'string') {
                                return (<td
                                    onClick={this.cellClick.bind(this, index, indexC)}
                                    key={index + '-' + indexC}>{ParseString(cell, this.props.useInnerHTML)}
                                </td>)
                            } else if (typeof cell === 'boolean' || typeof cell === 'number') {

                                return (<td
                                    onClick={this.cellClick.bind(this, index, indexC)}
                                    key={index + '-' + indexC}>{`${cell}`}
                                </td>)
                            } else if (React.isValidElement(cell)) {
                                return (<td
                                    onClick={this.cellClick.bind(this, index, indexC)}
                                    key={index + '-' + indexC}>{cell}
                                </td>)
                            } else {
                                const iCell = cell as ICell
                                if (iCell.isVisible) {
                                    return iCell.rawContent ? (iCell.rawContent) : (
                                        (<td
                                            onClick={this.cellClick.bind(this, index, indexC)}
                                            id={iCell.id}
                                            style={iCell.style}
                                            className={iCell.className}
                                            key={index + '-' + indexC}>{iCell.content}</td>)
                                    )
                                } else {
                                    return null;
                                }
                            }
                        } else {
                            return <td></td>
                        }
                    })
                }
            </tr>
        )
    }


    private renderTd(row: Array<string | number | boolean | React.ReactElement | ICell | undefined | null> | RowProperty, index: number) {
        if (Array.isArray(row)) {

            return this.renderItemList(row, index)
        } else {

            return this.renderItemRowProperty(row, index)
        }
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
                <colgroup>
                    {
                        this.listGroup.map((col, index) => {
                            if (!col.span) {
                                return <col key={'c77' + index}/>
                            } else {
                                return <col key={'c77' + index} id={col.id} className={col.className} style={col.style}
                                            span={col.span}/>
                            }
                        })

                    }
                </colgroup>


                <tbody>
                {
                    this.renderHeaderGroup()
                }
                <tr>
                    {
                        this.list.map((c, index) => {
                            return <th
                                onClick={this.columnClick.bind(this, index)}
                                key={"col_" + index}
                                className={c.className}
                                style={c.style}>{c.children}
                            </th>
                        })
                    }
                </tr>
                {
                    this.props.rowItems?.map((row, indexR) => {

                        return this.renderTd(row, indexR)

                    })
                }
                </tbody>
            </table>
        )
            ;
    }

}