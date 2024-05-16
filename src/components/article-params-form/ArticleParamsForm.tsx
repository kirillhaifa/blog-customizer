import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useRef, useEffect, useState, FormEvent } from 'react';
import { Select } from '../select';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text';

import styles from './ArticleParamsForm.module.scss';

export type ParamType = {
	selectedOption: OptionType;
	selectOption: React.Dispatch<React.SetStateAction<OptionType>>;
};

export type ParamsType = {
	fontFamily: ParamType;
	fontSize: ParamType;
	fontColor: ParamType;
	backgroundColor: ParamType;
	contentWidth: ParamType;
};

export const ArticleParamsForm: React.FC<{
	submitAction: (
		evt: FormEvent<HTMLFormElement>,
		toggleForm: () => void
	) => void;
	resetAction: () => void;
	changeAction: (
		optionKey: keyof ParamsType,
		selectedOption: OptionType
	) => void;
	formParameters: ParamsType;
}> = ({ submitAction, resetAction, changeAction, formParameters }) => {
	const [formOpen, setFormOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (formOpen && !containerRef.current?.contains(event.target as Node)) {
				toggleForm();
			}
		};
		window.addEventListener('mousedown', handleClickOutside);

		return () => {
			window.removeEventListener('mousedown', handleClickOutside);
		};
	}, [formOpen]);

	const toggleForm = () => {
		setFormOpen(!formOpen);
		if (containerRef.current) {
			containerRef.current.classList.toggle(styles.container_open);
		}
	};

	return (
		<div ref={containerRef} className={styles.container}>
			<ArrowButton isOpen={formOpen} onClick={toggleForm} />
			<aside className={styles.formContainer}>
				<form
					className={styles.form}
					onSubmit={(event) => submitAction(event, toggleForm)}>
					<Text family={'open-sans'} size={31} weight={800} uppercase={true}>
						{'Задайте параметры'}
					</Text>
					<Select
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(selectedOption) =>
							changeAction('fontFamily', selectedOption)
						}
						selected={formParameters.fontFamily.selectedOption}
					/>
					<RadioGroup
						selected={formParameters.fontSize.selectedOption}
						name='radio'
						onChange={(selectedOption) =>
							changeAction('fontSize', selectedOption)
						}
						options={fontSizeOptions}
						title='Размер шрифта'></RadioGroup>
					<Select
						options={fontColors}
						title='Цвет шрифта'
						onChange={(selectedOption) =>
							changeAction('fontColor', selectedOption)
						}
						selected={formParameters.fontColor.selectedOption}
					/>
					<Separator></Separator>
					<Select
						options={backgroundColors}
						title='Цвет фона'
						onChange={(selectedOption) =>
							changeAction('backgroundColor', selectedOption)
						}
						selected={formParameters.backgroundColor.selectedOption}
					/>
					<Select
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(selectedOption) =>
							changeAction('contentWidth', selectedOption)
						}
						selected={formParameters.contentWidth.selectedOption}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetAction} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
