import AppLoader from './appLoader';
import { TCallbackVoid, IGetNewsResponse, IGetSourcesResponse, ISourceItem } from './../../types/types';

class AppController extends AppLoader {
    getSources(callback: TCallbackVoid<IGetSourcesResponse>): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: TCallbackVoid<IGetNewsResponse>): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') as string;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }

    sortSources(e: MouseEvent, sourceResponse: IGetSourcesResponse, callback: TCallbackVoid<ISourceItem[]>): void {
        e.preventDefault();
        if (!sourceResponse?.sources) return;
        const target = e.target as HTMLElement;
        const navItems = document.querySelectorAll('.nav__item');
        navItems.forEach((item) => item.classList.remove('active'));
        target.classList.add('active');
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
