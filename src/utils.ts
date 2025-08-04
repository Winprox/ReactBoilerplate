import { ClassNameValue, twMerge } from 'tailwind-merge';

export const cm = (...inputs: ClassNameValue[]) => twMerge(inputs);
