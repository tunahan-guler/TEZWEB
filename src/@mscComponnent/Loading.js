import { Dialog } from '@material-ui/core';
import { CircularProgress } from '@mui/material';
import React from 'react';
import Modal from '@mui/material/Modal';

class Loading extends React.PureComponent {
    state = {
        isVisible: false,
    };
    static _ref = null;

    static setRef(ref) {
        this._ref = ref;
    }

    static show() {
        this._ref.show();
    }

    static toggle() {
        this._ref.toggle();
    }

    static hide() {
        this._ref.hide();
    }

    async show() {
        await this._setState({ isVisible: true });
    }

    async hide() {
        await this._setState({ isVisible: false });
    }

    async toggle() {
        await this._setState({ isVisible: !this.state.isVisible });
    }

    constructor(props) {
        super(props);

        this._setState = this._setState.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    _setState(reducer) {
        return new Promise((resolve) => this.setState(reducer, () => resolve()));
    }

    render() {
        const { isVisible } = this.state;
        return (
            <Modal
                open={isVisible}
                style={{ justifyContent: 'center', display: 'flex', height: '100%', width: '100%', alignItems: 'center' }}
            >
                <CircularProgress color={'info'} />
            </Modal>
        );
    }
}

export default Loading;
