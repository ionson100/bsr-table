# bsr-table

> ReactJs component table

[![NPM](https://img.shields.io/npm/v/bsr-table.svg)](https://www.npmjs.com/package/bsr-table) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save bsr-table
```

## Usage

```tsx
import React, {ReactElement} from "react";
import {Table, Column, ICell,} from "bsr-table";
import "bsr-table/dist/index.css"

function getDataTable(): Array<Array<string | ReactElement | ICell>> {
    const list: Array<Array<string | ReactElement | ICell>> = [];
    list.push(['cell1', 'cell2', 'cell3', 'cell4'])
    list.push(['cell1', 'cell2', 'cell3', 'cell4'])
    list.push(['cell1', 'cell2', 'cell3', 'cell4'])
    list.push(['cell1', 'cell2', 'cell3', 'cell4'])
    return list;
}

<Table
    id={"table_123"}
    caption={'Quick stat table:'}
    rowItems={getDataTable()}
    style={{width: "700px"}}>
    
    <Column style={{width: "100px"}}>Column:1</Column>
    <Column>Column:2</Column>
    <Column>Column:3</Column>
    <Column>Column:4</Column>
    
</Table>

```

## License

MIT © [ionson100](https://github.com/ionson100)
