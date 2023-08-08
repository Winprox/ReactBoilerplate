import { useEffect } from 'react';
import { store } from '../logic/store';
import { Consts, cm } from '../utils';

export const App = () => {
  const { count, increase, data, fetch } = store();

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div
      style={{ height: '100svh' }}
      className={cm(
        'relative h-full select-none bg-white',
        'flex flex-col items-center justify-center'
      )}
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
          'absolute left-0 top-0 m-5 flex w-auto flex-col gap-0 px-3 py-2',
          'rounded-md bg-blue-600 leading-5 text-white shadow-md'
        )}
      >
        <p>{`Version ${Consts.version}`}</p>
        <p>{`${Consts.isModeDev ? 'Development' : 'Production'} Build`}</p>
      </div>
    </div>
  );
};
