import React, {ReactElement} from 'react';

import '../src/table/index.css';
import {Table} from "./table/Table";
import {Column} from "./table/Column";
import {ICell} from "./table/PropsTable";

function add(){
    return <div style={{color:"red",background:"blue",width:"100%",height:50}}>assa4</div>
}

function App() {
    const list:Array<Array<string|ReactElement|ICell>> =[];
    list.push(['assa1','assa2'])

    list.push(['assa1',{
        style:{background:"gray"},
        content:"assa3"
    }])
    list.push(['assa1',add(),])
  return (
      <Table
          onClickRow={(id,index)=>{
              alert(id+" "+index)
          }}
          onClickColumn={(index)=>{
              alert(index)
          }}
          caption={'Simple table'}
          style={{width:"500px",background:"yellow"}}
          rowItems={list}
      >
          <Column style={{width:"30%",color:"white"}} >Simple</Column>
          <Column style={{width:"30%",color:"white"}} >Simple</Column>
      </Table>
  );
}

export default App;
