import { Component, PropsWithChildren } from 'react';

import { cm } from '../utils';

type State = { error: string };

class ErrorBoundary extends Component<PropsWithChildren, State> {
    public state: State = {
        error: ''
    };

    public static getDerivedStateFromError({ message }: Error): State {
        return { error: `${message}` };
    }

    public render() {
        const style = cm('h-full bg-gray-800 p-16 text-center text-5xl text-red-500');
        const error = this.state.error;
        return this.state.error ? <div className={style}>{error}</div> : this.props.children;
    }
}

export default ErrorBoundary;
