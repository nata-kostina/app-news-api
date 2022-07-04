import { ISourceItem } from './../../../types/types';

class Sources {
    draw(data: ISourceItem[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
        const sourcesDiv = document.querySelector('.sources') as HTMLElement;
        if (data && data.length > 0) {
            data.forEach((item) => {
                const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

                (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
                (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);
                (sourceClone.querySelector('.source__item-name') as HTMLElement).style.fontSize = `${Math.ceil(
                    Math.random() * (4 - 1) + 1
                )}em`;

                fragment.append(sourceClone);
            });
            sourcesDiv.innerHTML = '';
            sourcesDiv.append(fragment);
        }
    }

    clear(): void {
        (document.querySelector('.sources') as HTMLElement).innerHTML = '';
    }
}

export default Sources;
