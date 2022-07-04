import { IGetNewsResponse, IGetSourcesResponse } from '../../types/types';
import News from './news/news';
import Sources from './sources/sources';
import { ISourceItem } from './../../types/types';
import Message from './message/message';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;
    private readonly message: Message;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
        this.message = new Message();
    }

    drawNews(data?: IGetNewsResponse): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data?: IGetSourcesResponse): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }

    drawSortedSources(data: ISourceItem[]): void {
        const values = data || [];
        this.sources.draw(values);
    }

    drawMessage(data: string) {
        this.message.draw(data);
    }

    clearAll(): void {
        this.news.clear();
        this.sources.clear();
        this.message.clear();
    }
}

export default AppView;
