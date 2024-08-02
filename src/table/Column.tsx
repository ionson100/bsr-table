import React from "react";
import {PropsColumn, PropsColumnGroups} from "./PropsTable";

export class Column extends React.Component<PropsColumn, any>{
    constructor({props}: { props: Readonly<PropsColumn> }) {
        super(props);
        alert(22)
    }
    render() {
        return undefined;
    }
}

