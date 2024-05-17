import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import { useRef } from 'react';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;
export const ArrowButton = ({
	onClick,
	isOpen,
}: {
	onClick?: OnClick;
	isOpen?: boolean;
}) => {
	const arrowRef = useRef<HTMLImageElement>(null);

	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={styles.container}
			onClick={onClick}>
			<img
				ref={arrowRef}
				src={arrow}
				alt='иконка стрелочки'
				className={`${styles.arrow} ${isOpen ? styles.arrow_open : ''}`}
			/>
		</div>
	);
};
