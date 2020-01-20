import React from 'react';
import styles from './Error.module.scss';
import { ErrorFC } from './types';

const Error: React.FC<ErrorFC> = ({ msg }) => {
  return <div className={styles.error}>{msg}</div>;
};
export default Error;
