import AppController from '../controller/controller';
import AppView from '../view/appView';
import state from '../state/state';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const navigation = document.querySelector('.alphabetic-nav') as HTMLElement;
        const sources = document.querySelector('.sources') as HTMLDivElement;
        sources.addEventListener('click', (e) => {
            this.controller.getNews(
                e,
                (data) => {
                    this.view.clearAll();
                    if (data && data.articles.length > 0) {
                        this.view.drawNews(data);
                    } else {
                        this.view.drawMessage('Ooops! The news were not found.');
                    }
                },
                (error: Error) => {
                    this.view.clearAll();
                    this.view.drawMessage(`Ooops! ${error.message}`);
                }
            );
        });
        this.controller.getSources(
            (data) => {
                this.view.clearAll();
                if (data && data.sources.length > 0) {
                    state.setSourceResponse(data);
                    this.view.drawSources(data);
                } else {
                    this.view.drawMessage('Ooops! The sources were not found.');
                }
            },
            (error: Error) => {
                this.view.clearAll();
                this.view.drawMessage(`Ooops! ${error.message}`);
            }
        );
        navigation.addEventListener('click', (e) => {
            this.view.clearAll();
            const response = state.getSourceResponse();
            this.controller.filterSourcesQuick(e, response, (data) => state.setSources(data));
            if (!state.getIsAuth()) this.view.drawMessage('Ooops! You are not authorized. Check your API key.');
            else if (state.getSources() && state.getSources().length > 0)
                this.view.drawSortedSources(state.getSources());
            else this.view.drawMessage('Ooops! The sources were not found.');
        });

        const form = document.getElementById('form') as HTMLFormElement;
        form.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            console.log(target);
            if (target.closest('.selection')) {
                const navItems = document.querySelectorAll('.nav__item');
                navItems.forEach((item) => item.classList.remove('active'));
            }
        });
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.controller.filterSourcesAdvanced((data) => {
                this.view.clearAll();
                if (data && data.length > 0) this.view.drawSortedSources(data);
                else {
                    this.view.drawMessage('Ooops! The sources were not found.');
                }
            });
        });
    }
}

export default App;
