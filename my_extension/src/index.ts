import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {ButtonExtension} from "./button"; 
/**
 * Initialization data for the my-first-extension extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'my-first-extension:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension my-first-extension is activated!');
    const your_button = new ButtonExtension();
    app.docRegistry.addWidgetExtension('Notebook', your_button);
  }
};

export default extension;
