import React, {Children} from "react";
import {ICell, PropsColumn, PropsTable} from "./PropsTable";
import {v4 as uuidv4} from 'uuid';
export class Table extends React.Component<PropsTable, any> {
    private list: Array<PropsColumn> = []
    private id?:string;

    constructor({props}: { props: Readonly<PropsTable> }) {
        super(props);
        this.id=uuidv4()

    }

    innerRender() {

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


    render() {
        this.innerRender()
        return (

            <table style={this.props.style} is={this.props.id} className={this.props.className}>
                {this.props.caption ? (
                    <caption>
                        {
                            this.props.caption
                        }
                    </caption>


                ) : (null)}
                <tbody>
                <tr>
                    {
                        this.list.map((c, index) => {
                            return <th onClick={() => {
                                if (this.props.onClickColumn) {
                                    this.props.onClickColumn(index)
                                }
                            }
                            }
                                       key={index}
                                       className={c.className}
                                       style={c.style}>{c.children}
                            </th>
                        })
                    }
                </tr>
                {
                    this.props.rowItems?.map((row, indexR) => {
                        return (
                            <tr
                                onClick={()=>{
                                    if(this.props.onClickRow){
                                        this.props.onClickRow(this.id!,indexR)
                                    }
                                }}
                                data-row-id={this.id+"_"+indexR}>
                                {
                                    row.map((cell, indexC) => {


                                        if (typeof cell === 'string' || React.isValidElement(cell)) {
                                            return (<td key={indexR + '-' + indexC}>{cell}</td>)
                                        } else {
                                            const iCell = cell as ICell
                                            return (<td
                                                id={iCell.id}
                                                style={iCell.style}
                                                className={iCell.className}
                                                key={indexR + '-' + indexC}>{iCell.content}</td>)
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