import Store from './store';
import util from 'util';

export function getState() {
    if (document.visibilityState === 'hidden') {
        return 'hidden';
    }
    if (document.hasFocus()) {
        return 'active';
    }
    return 'passive';
};

export enum cacheActions {
    DumpState = 'DumpState',
    RestoreState = 'RestoreState',
    ClearDB = 'ClearDB'
}

export default class BootstrapLifecycle {
    state:ReturnType<typeof getState> = getState();

    messageChannel = new MessageChannel();

    listenVisibilityEvent(event: Event | null = null) {
        console.log(`prev: ${this.state}, cur: ${getState()}, event: ${JSON.stringify(event)}`);
        if((this.state === 'passive' || this.state === 'active') && getState() === 'hidden') {
            this.setData(Store.state);
        } else if (this.state === 'hidden' && (getState() === 'passive' || getState() === 'active')) {
            this.loadData();
        }
        this.state = getState();
    };

    loadData() {
        if(navigator && navigator.serviceWorker && navigator.serviceWorker.controller) {
            this.messageChannel = new MessageChannel();
            this.messageChannel.port1.onmessage = e => {
                console.log(e);
                if(e.data && e.data.payload && Object.keys(e.data.payload).length > 2) {
                    Store.replaceState(e.data.payload);
                    Store.dispatch('updateAllGraphs');
                }
            }
            navigator.serviceWorker.controller.postMessage({command: cacheActions.RestoreState}, [this.messageChannel.port2]);
        }
    }

    setData(data: any) {
        console.log(data);
        if (navigator && navigator.serviceWorker && navigator.serviceWorker.controller && Object.keys(data).length > 0) {
            this.messageChannel = new MessageChannel();
            delete data.selectedGraph.config;
            delete data.graphs;
            navigator.serviceWorker.controller.postMessage({command: cacheActions.DumpState, payload: data  }, [this.messageChannel.port2]);
        }
    }

    constructor() {
        this.loadData();
        window.addEventListener('visibilitychange', this.listenVisibilityEvent.bind(this), {capture: true});
    }
}
