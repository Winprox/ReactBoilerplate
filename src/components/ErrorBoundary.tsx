import { Alert } from '@mui/material';
import { Component, PropsWithChildren } from 'react';

type State = { error: Error | null };

class ErrorBoundary extends Component<PropsWithChildren, State> {
    public state: State = { error: null };

    public static getDerivedStateFromError(error: Error): State {
        return { error };
    }

    public render() {
        const error = this.state.error;
        if (!error) return this.props.children;

        return (
            <Alert className='text-3xl whitespace-pre-line' severity='error'>
                {`${error.stack}`}
            </Alert>
        );
    }
}

export default ErrorBoundary;
