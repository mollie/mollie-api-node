import type Nullable from './Nullable';

type Callback<R> = (error: Nullable<Error>, result: R) => void;

export default Callback;
