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
	defaultArticleState,
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
	articleParams: ParamsType;
}> = ({ articleParams }) => {
	const [formOpen, setFormOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	//состояния формы
	const [selectedFontFamilyFormOption, setSelectedFontFamilyFormOption] =
		useState(articleParams.fontFamily.selectedOption);
	const [selectedFontSizeFormOption, setSelectedFontSizeFormOption] = useState(
		articleParams.fontSize.selectedOption
	);
	const [selectedFontColorFormOption, setSelectedFontColorFormOption] =
		useState(articleParams.fontColor.selectedOption);
	const [
		selectedBackgroundColorFormOption,
		setSelectedBackgroundColorFormOption,
	] = useState(articleParams.backgroundColor.selectedOption);
	const [selectedContentWidthFormOption, setSelectedContentWidthFormOption] =
		useState(articleParams.contentWidth.selectedOption);

	//состояния формы собранные в объект
	const formParameters = {
		fontFamily: {
			selectedOption: selectedFontFamilyFormOption,
			selectOption: setSelectedFontFamilyFormOption,
		},
		fontSize: {
			selectedOption: selectedFontSizeFormOption,
			selectOption: setSelectedFontSizeFormOption,
		},
		fontColor: {
			selectedOption: selectedFontColorFormOption,
			selectOption: setSelectedFontColorFormOption,
		},
		backgroundColor: {
			selectedOption: selectedBackgroundColorFormOption,
			selectOption: setSelectedBackgroundColorFormOption,
		},
		contentWidth: {
			selectedOption: selectedContentWidthFormOption,
			selectOption: setSelectedContentWidthFormOption,
		},
	};

	//обработка изменений в селекте
	const handleChange = (optionName: keyof ParamsType) => {
		return (selectedOption: OptionType) => {
			formParameters[optionName].selectOption(selectedOption);
		};
	};

	//сабмит формы
	const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		//обновляем состояние app
		articleParams.fontFamily.selectOption(
			formParameters.fontFamily.selectedOption
		);
		articleParams.fontSize.selectOption(formParameters.fontSize.selectedOption);
		articleParams.fontColor.selectOption(
			formParameters.fontColor.selectedOption
		);
		articleParams.backgroundColor.selectOption(
			formParameters.backgroundColor.selectedOption
		);
		articleParams.contentWidth.selectOption(
			formParameters.contentWidth.selectedOption
		);

		toggleForm();
	};

	//обработка ресета
	const handleReset = () => {
		//обновляем состояние формы
		formParameters.fontFamily.selectOption(
			defaultArticleState.fontFamilyOption
		);
		formParameters.fontSize.selectOption(defaultArticleState.fontSizeOption);
		formParameters.fontColor.selectOption(defaultArticleState.fontColor);
		formParameters.backgroundColor.selectOption(
			defaultArticleState.backgroundColor
		);
		formParameters.contentWidth.selectOption(defaultArticleState.contentWidth);

		//обновляем состояние app
		articleParams.fontFamily.selectOption(defaultArticleState.fontFamilyOption);
		articleParams.fontSize.selectOption(defaultArticleState.fontSizeOption);
		articleParams.fontColor.selectOption(defaultArticleState.fontColor);
		articleParams.backgroundColor.selectOption(
			defaultArticleState.backgroundColor
		);
		articleParams.contentWidth.selectOption(defaultArticleState.contentWidth);
	};

	//навешиваем и убираем слушатель на экран при каждом рендере
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

	//открытие - зыкрытие меню
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
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text family={'open-sans'} size={31} weight={800} uppercase={true}>
						{'Задайте параметры'}
					</Text>
					<Select
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={handleChange('fontFamily')}
						selected={formParameters.fontFamily.selectedOption}
					/>
					<RadioGroup
						selected={formParameters.fontSize.selectedOption}
						name='radio'
						onChange={handleChange('fontSize')}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						title='Цвет шрифта'
						onChange={handleChange('fontColor')}
						selected={formParameters.fontColor.selectedOption}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						title='Цвет фона'
						onChange={handleChange('backgroundColor')}
						selected={formParameters.backgroundColor.selectedOption}
					/>
					<Select
						options={contentWidthArr}
						title='Ширина контента'
						onChange={handleChange('contentWidth')}
						selected={formParameters.contentWidth.selectedOption}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
