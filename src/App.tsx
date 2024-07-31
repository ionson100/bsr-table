import React, {ReactElement} from 'react';

import '../src/table/index.css';
import {Table} from "./table/Table";
import {Column} from "./table/Column";
import {ICell} from "./table/PropsTable";



function App() {
    const list:Array<Array<string|ReactElement|ICell>> =[];
    list.push(['asas','((sender: LeftMenu, obj: ParamsClick))=>void \n' +
    'ParamsClick = { \n' +
    '  path: MenuItem[] \n' +
    '  items: MenuItem \n' +
    '  element:       HTMLAnchorElement \n' +
    '} ',{content:"assas"}])
    for (let i = 0; i < 10 ; i++) {
        list.push(['assa1:;>','assa'+i])
    }

  return (
      <Table id={'assa234'}
          onClickRow={(id,index)=>{
              alert(id+" "+index)
          }}
          onClickColumn={(index)=>{
              alert(index)
          }}
          caption={'Simple table'}
          style={{width:"800px"}}
          rowItems={list}
             useInnerHTML={true}
      >
          <Column style={{width:"30%",color:"white"}} >Simple</Column>
          <Column style={{width:"70%",color:"white"}} >Simple</Column>
      </Table>
  );
}

export default App;
