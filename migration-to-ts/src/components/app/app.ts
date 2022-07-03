import AppController from '../controller/controller';
import AppView from '../view/appView';
import State from './../state/state';

class App {
    private controller: AppController;
    private view: AppView;
    private state: State;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
        this.state = new State();
    }

    start(): void {
        const navigation = document.querySelector('.alphabetic-nav') as HTMLElement;
        const sources = document.querySelector('.sources') as HTMLElement;
        sources?.addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
        this.controller.getSources((data) => {
            this.state.setSourceResponse(data);
            this.view.drawSources(data);
        });
        navigation.addEventListener('click', (e) => {
            this.controller.sortSources(e, this.state.getSourceResponse(), (data) => this.state.setSources(data));
            this.view.drawSortedSources(this.state.getSources());
        });
    }
}

export default App;
