import { FC, useEffect } from 'react';
import { cm } from '@/shared/utils';
import { store } from '../model/pageStore';

export const Page: FC = () => {
    const { count, increase, data, fetch } = store();

    useEffect(() => {
        fetch();
    }, [fetch]);

    return (
        <div
            style={{ height: '100svh' }}
            className='relative flex select-none flex-col items-center justify-center bg-slate-200 font-body'
        >
            <button
                className={cm(
                    'rounded-md bg-blue-600 px-3 py-2 text-white shadow-md',
                    'transition-all hover:scale-105 active:scale-95'
                )}
                onClick={increase}
            >{`Clicked ${count} times`}</button>
            <h1>{data}</h1>
            <div
                className={cm(
                    'absolute left-0 top-0 m-5 w-auto px-2 py-1',
                    'rounded-md bg-blue-600 text-white shadow-md'
                )}
            >
                {`${APP_VER} [${window.env}]`}
            </div>
        </div>
    );
};
