import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector, useStore as useReduxStore } from 'react-redux';
import store from '../store';

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
type AppStore = typeof store;

export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useStore = () => useReduxStore<AppStore>();
