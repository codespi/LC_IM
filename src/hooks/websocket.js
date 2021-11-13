function useWebSocket (handleMessage) {
    const ws = new WebSocket('ws://localhost:8000');

    const init = () => {
        bindEvent();
    }

    function bindEvent () {
        ws.addEventListener('open', handleOpen, false);
        ws.addEventListener('close', handleClose, false);
        ws.addEventListener('error', handleError, false);
        ws.addEventListener('message', handleMessage, false);//一般要抛出去 外界传进来
    }

    function handleOpen (e) {
        console.log('WebSocket open', e);
    }

    function handleClose (e) {
        console.log('WebSocket close', e);
    }

    function handleError (e) {
        console.log('WebSocket error', e);
    }
    

    init();

    return ws;
}

export default useWebSocket;