import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
  ILabShell
} from '@jupyterlab/application';

import { Widget } from "@lumino/widgets";
import { FetchActiveRuns } from './data_handler';

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
    widget.title.iconClass = "jp-SpreadsheetIcon jp-SideBar-tabIcon";
    widget.title.caption = "Mlflow Track Runs";

    let summary = document.createElement('div');
    summary.style.backgroundColor = 'white';
    widget.node.appendChild(summary);
    
    const data = new FetchActiveRuns();
    data.getruns();
    const response_data = data.responseData;
    console.log(response_data)
    // try {
    //   var list = document.createElement('ul');
    //   if(data !== null){
    //       for(let i=0;i<data.runs.length;i++){
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
