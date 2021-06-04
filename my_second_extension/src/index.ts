import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
  ILabShell
} from '@jupyterlab/application';

import { MainAreaWidget } from '@jupyterlab/apputils';
import { Metrics } from './Metrics';

/**
 * Initialization data for the my_second_extension extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'my_second_extension:plugin',
  autoStart: true,
  requires: [ILabShell],
  activate: (app: JupyterFrontEnd, labShell: ILabShell) => {
    console.log('JupyterLab extension my_panel_extension is activated!');
    const content = new Metrics();
    content.node.style.minWidth = '20vw';
    const widget = new MainAreaWidget<Metrics>({ content });
    widget.id = '@jupyterlab-panel/runs';
    widget.title.iconClass = 'jp-SpreadsheetIcon jp-SideBar-tabIcon';
    widget.title.caption = 'Mlflow Track Runs';

    labShell.add(content, 'right');
  }
};

export default extension;
