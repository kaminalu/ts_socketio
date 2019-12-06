import { h, render, Component } from 'preact';
const io_client = require('socket.io-client');
const socket = io_client();

class Hello extends Component {
    constructor() {
        super();

        this.state = { msgs: [] };

        const random = Math.random();
        console.log(`sending ${random}`)
        socket.emit('chat message', `client sez ${Math.random()}`);

        socket.on('chat message reply', (msg) => {
            const ok = this.state as any;
            console.log(`received from server: ${msg}`);
            this.setState({ msgs: [ msg, ...ok.msgs ] })
        });
    }

	render({}, { msgs }) {
        return <div>
            msgs from server: { msgs.map((msg) => 
                <div>{ msg }</div>
            ) }
        </div>
	}
}

render(<Hello />, document.body);
