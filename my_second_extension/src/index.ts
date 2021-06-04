import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
  ILabShell
} from '@jupyterlab/application';

import {runIcon} from './icon';
import { Widget } from "@lumino/widgets";
import axios from 'axios';

/**
 * Initialization data for the my_second_extension extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'my_second_extension:plugin',
  autoStart: true,
  requires: [ILabShell],
  activate: (app: JupyterFrontEnd, labShell: ILabShell) => {
    console.log('JupyterLab extension my_panel_extension is activated!');
    const widget = new Widget();
    widget.id = "@jupyterlab-panel/runs";
    widget.title.icon = runIcon;
    widget.title.caption = "Mlflow Track Runs";
    
    axios.get('http://localhost:5002/getruns',).then(resp => {
      console.log(resp.data);
    }).catch(error => {
      console.log(error)
    })

    let summary = document.createElement('p');
    summary.innerText = "hello world"
    summary.style.backgroundColor = 'white';
    widget.node.appendChild(summary);
    
    // try {
    //   var list = document.createElement('ul');
    //   if(data !== null){
    //       for(let i=0;i<Object.keys(data[0]).length;i++){
    //         let runs_items = document.createElement('li');
    //         runs_items.appendChild(document.createTextNode(data[i].params[0].key));
    //         list.appendChild(runs_items);
    //       }
    //   }
    //   summary.appendChild(list)
    // } catch (reason) {
    //   console.error(reason);
    // }
  
    labShell.add(widget, "right");
  }
};

export default extension;
