import Store from './store';

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
                Store.replaceState(e.data.payload);
            }
            navigator.serviceWorker.controller.postMessage({command: cacheActions.RestoreState}, [this.messageChannel.port2]);
        }
    }

    stripFuncs(data: any) {
        let mut = {...data};
        let keys = Object.keys(mut);
        keys.forEach(k => {
            if(typeof(k)==='function') {
                console.log('deleted ' + k);
                delete mut[k];
            } else if(typeof(k)==='object') {
                mut[k] = this.stripFuncs(mut[k]);
            }
        });
        console.log(mut);
        return mut;
    }

    setData(data: any) {
        console.log(data);
        if (navigator && navigator.serviceWorker && navigator.serviceWorker.controller) {
            data = this.stripFuncs(data);
            this.messageChannel = new MessageChannel();
            navigator.serviceWorker.controller.postMessage({command: cacheActions.DumpState, payload: data  }, [this.messageChannel.port2]);
        }
    }

    constructor() {
        this.loadData();
        window.addEventListener('visibilitychange', this.listenVisibilityEvent.bind(this), {capture: true});
    }
}
