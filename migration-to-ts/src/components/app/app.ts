import AppController from '../controller/controller';
import  AppView from '../view/appView';
import { ILoadedData } from './../../types/types';
//const { AppController } = require('../controller/controller');
//const { AppView } = require('../view/appView');
interface IData {
  body: string
};
class App {
  private controller: AppController;
  private view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
      const sources = document.querySelector('.sources') as HTMLElement;
      sources?.addEventListener('click', (e) => this.controller.getNews(e, (data: ILoadedData) => this.view.drawNews(data)));
      this.controller.getSources((data: ILoadedData) => this.view.drawSources(data));
    }
}

export default App;
