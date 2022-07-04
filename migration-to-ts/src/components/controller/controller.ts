import AppLoader from './appLoader';
import { TCallbackVoid, IGetNewsResponse, IGetSourcesResponse, ISourceItem, IFilter } from './../../types/types';
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
        const newsContainer = e.currentTarget as HTMLDivElement;
        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') as string;
                const source = state.getSources().find((s) => s.id === sourceId) as ISourceItem;

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

    filterSourcesQuick(
        e: MouseEvent,
        sourceResponse: IGetSourcesResponse,
        callback: TCallbackVoid<ISourceItem[]>
    ): void {
        e.preventDefault();
        const categorySelection = document.querySelector('#category-selection') as HTMLSelectElement;
        categorySelection.value = 'all';
        const langSelection = document.querySelector('#lang-selection') as HTMLSelectElement;
        langSelection.value = 'all';
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

    filterSourcesAdvanced(callback: TCallbackVoid<ISourceItem[]>): void {
        const navItems = document.querySelectorAll('.nav__item');
        navItems.forEach((item) => item.classList.remove('active'));
        const form = document.getElementById('form') as HTMLFormElement;
        const categorySelection = form.querySelector('#category-selection') as HTMLSelectElement;
        const valueCategory = categorySelection.options[categorySelection.selectedIndex].value as string;
        const langSelection = form.querySelector('#lang-selection') as HTMLSelectElement;
        const valueLang = langSelection.options[langSelection.selectedIndex].value as string;
        const filter: IFilter = {
            category: valueCategory,
            language: valueLang,
        };
        const sourcesResponse = state.getSourceResponse() as IGetSourcesResponse;
        const sources = sourcesResponse.sources as ISourceItem[];
        if (!sources || sources.length === 0) return;
        callback(
            sources.filter((source) => {
                return (
                    (filter.category.toLowerCase() === 'all' ||
                        source.category.toLowerCase() === filter.category.toLowerCase()) &&
                    (filter.language.toLowerCase() === 'all' ||
                        source.language.toLowerCase() === filter.language.toLowerCase())
                );
            })
        );
    }
}

export default AppController;
