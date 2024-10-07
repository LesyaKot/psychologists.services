import { Oval } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.loaderWrap}>
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#f37113"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}