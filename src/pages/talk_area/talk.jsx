import React from "react";
import { useWebSocket } from '../../hooks'

function Talk() {

    const handleMessage = function (e) {
        console.log(e);
    }
    const ws = useWebSocket(handleMessage)

    const handleSendBtnClick = () => {
        let username = localStorage.getItem('username');

        ws.send(JSON.stringify({
            id: new Date().getTime(),
            user: username,
            dateTime: new Date().getTime(),
            msg: ''
        }));
    }
    return (
        <div>
            talk
        </div>
    )
}

export default Talk