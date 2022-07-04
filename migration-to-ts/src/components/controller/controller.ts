import AppLoader from './appLoader';
import { TCallbackVoid, IGetNewsResponse, IGetSourcesResponse, ISourceItem } from './../../types/types';
import state from './../state/state';

class AppController extends AppLoader {
    getSources(callback: TCallbackVoid<IGetSourcesResponse>, handleError: TCallbackVoid<Error>): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback,
            handleError
        );
    }

    getNews(e: MouseEvent, callback: TCallbackVoid<IGetNewsResponse>, handleError: TCallbackVoid<Error>): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;
        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') as string;
                const source = state.getSources().find((s) => s.id === sourceId) as ISourceItem;
                state.setCurrentSource(source);
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback,
                        handleError
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }

    sortSources(e: MouseEvent, sourceResponse: IGetSourcesResponse, callback: TCallbackVoid<ISourceItem[]>): void {
        e.preventDefault();
        const target = e.target as HTMLElement;
        const navItems = document.querySelectorAll('.nav__item');
        navItems.forEach((item) => item.classList.remove('active'));
        target.classList.add('active');
        if (!sourceResponse?.sources) return;
        let sorted: ISourceItem[];
        if (target.innerHTML === 'All') sorted = sourceResponse.sources;
        else
            sorted = sourceResponse.sources.filter(
                (source) => source.name[0].toLowerCase() === target.innerHTML.toLowerCase()
            );
        callback(sorted);
    }
}

export default AppController;
