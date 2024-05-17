import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useRef, useEffect, useState, FormEvent, CSSProperties } from 'react';
import { Select } from '../select';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	defaultArticleState,
	defaultStyle,
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
	setStyle: React.Dispatch<React.SetStateAction<CSSProperties>>;
}> = ({ articleParams, setStyle }) => {
	const [formOpen, setFormOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	//состояния формы
	const [selectedFontFamilyFormOption, setSelectedFontFamilyFormOption] =
		useState(fontFamilyOptions[0]);
	const [selectedFontSizeFormOption, setSelectedFontSizeFormOption] = useState(
		fontSizeOptions[0]
	);
	const [selectedFontColorFormOption, setSelectedFontColorFormOption] =
		useState(fontColors[0]);
	const [
		selectedBackgroundColorFormOption,
		setSelectedBackgroundColorFormOption,
	] = useState(backgroundColors[0]);
	const [selectedContentWidthFormOption, setSelectedContentWidthFormOption] =
		useState(contentWidthArr[0]);

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
	const handleSelectChange = (
		optionKey: keyof ParamsType,
		selectedOption: OptionType
	) => {
		//изменение стейтов app реализовано при изменении в селекте
		//если реализовать присвоение состояний формы состониям app в сабмите
		//и применять состояния app к статье, они не успевают обновиться
		//и сабмит работает только со второго раза и некорректно.
		//а с такой реализацией работает корректно при любых сценариях
		formParameters[optionKey].selectOption(selectedOption);
		articleParams[optionKey].selectOption(selectedOption);
	};

	//сабмит формы
	const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		setStyle({
			'--font-family': articleParams.fontFamily.selectedOption.value,
			'--font-size': articleParams.fontSize.selectedOption.value,
			'--font-color': articleParams.fontColor.selectedOption.value,
			'--container-width': articleParams.contentWidth.selectedOption.value,
			'--bg-color': articleParams.backgroundColor.selectedOption.value,
		} as CSSProperties);

		toggleForm();
	};

	//обработка ресета
	const handleReset = () => {
		//применяем  дефолтные стили
		setStyle(defaultStyle);

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
						onChange={(selectedOption) =>
							handleSelectChange('fontFamily', selectedOption)
						}
						selected={formParameters.fontFamily.selectedOption}
					/>
					<RadioGroup
						selected={formParameters.fontSize.selectedOption}
						name='radio'
						onChange={(selectedOption) =>
							handleSelectChange('fontSize', selectedOption)
						}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						title='Цвет шрифта'
						onChange={(selectedOption) =>
							handleSelectChange('fontColor', selectedOption)
						}
						selected={formParameters.fontColor.selectedOption}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						title='Цвет фона'
						onChange={(selectedOption) =>
							handleSelectChange('backgroundColor', selectedOption)
						}
						selected={formParameters.backgroundColor.selectedOption}
					/>
					<Select
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(selectedOption) =>
							handleSelectChange('contentWidth', selectedOption)
						}
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
