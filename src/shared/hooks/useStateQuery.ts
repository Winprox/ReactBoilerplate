import { useState } from 'react';
import { isFn } from '@/shared/utils';
import { useEvent } from './useEvent';

const getSearchParam = (search: string, param: string) => new URLSearchParams(search).get(param);
const setSearchParam = (search: string, param: string, val: string) => {
    const params = new URLSearchParams(search);
    params.set(param, val);
    return params.toString();
};

const defaultSerialize = String;
const defaultDeserialize = <Value>(v: string | null) => v as Value;

type TUseStateQueryOptions<Value> = {
    name: string;
    init?: (() => Value) | Value;
    serialize?: (value: Value) => string;
    deserialize?: (value: string | null) => Value;
};

export const useStateQuery = <Value>({
    name,
    init,
    serialize = defaultSerialize,
    deserialize = defaultDeserialize
}: TUseStateQueryOptions<Value>) => {
    const [value, setValue] = useState(() =>
        isFn(init) ? init() : init ?? deserialize(getSearchParam(location.search, name))
    );

    const updateValue = useEvent((newVal: ((prevState: Value) => Value) | Value) => {
        const search = window.location.search;
        const actualNewVal = isFn(newVal) ? newVal(value) : newVal;
        setValue(actualNewVal);
        history.pushState(null, '', `?${setSearchParam(search, name, serialize(actualNewVal))}`);
    });

    return [value, updateValue] as const;
};
