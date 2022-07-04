import { IGetSourcesResponse, ISourceItem } from './../../types/types';
class State {
    private sourceResponse: IGetSourcesResponse;
    private sources: ISourceItem[];
    private currentSource: ISourceItem;
    private isAuth = false;

    setSourceResponse(sourceResponse: IGetSourcesResponse | { sources: []; status: 'default' }): void {
        this.sourceResponse = sourceResponse;
        this.setSources(sourceResponse.sources);
    }

    getSourceResponse(): IGetSourcesResponse {
        return this.sourceResponse;
    }

    setSources(sources: ISourceItem[]): void {
        this.sources = sources;
    }

    getSources(): ISourceItem[] {
        return this.sources;
    }

    getCurrentSource(): ISourceItem {
        return this.currentSource;
    }

    setCurrentSource(source: ISourceItem): void {
        this.currentSource = source;
    }

    setIsAuth(value: boolean): void {
        this.isAuth = value;
    }
    getIsAuth(): boolean {
        return this.isAuth;
    }
}
const state = new State();
export default state;
