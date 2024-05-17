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
	resetAction: (resetFormParams: () => void) => void;
	articleParams: ParamsType;
	setStyle: any;
}> = ({ resetAction, setStyle }) => {
	const [formOpen, setFormOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

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

	const resetFormParams = () => {
		setSelectedFontFamilyFormOption(defaultArticleState.fontFamilyOption);
		setSelectedFontSizeFormOption(defaultArticleState.fontSizeOption);
		setSelectedFontColorFormOption(defaultArticleState.fontColor);
		setSelectedBackgroundColorFormOption(defaultArticleState.backgroundColor);
		setSelectedContentWidthFormOption(defaultArticleState.contentWidth);
	};

	const handleSelectChange = (
		optionKey: keyof ParamsType,
		selectedOption: OptionType
	) => {
		formParameters[optionKey].selectOption(selectedOption);
	};

	const handleSubmit = (
		evt: FormEvent<HTMLFormElement>,
		articleParams: ParamsType
	) => {
		evt.preventDefault();

		// Сначала обновляем состояния с новыми значениями из formParameters
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

		// Затем обновляем стили
		setStyle({
			'--font-family': articleParams.fontFamily.selectedOption.value,
			'--font-size': articleParams.fontSize.selectedOption.value,
			'--font-color': articleParams.fontColor.selectedOption.value,
			'--container-width': articleParams.contentWidth.selectedOption.value,
			'--bg-color': articleParams.backgroundColor.selectedOption.value,
		} as CSSProperties);

		toggleForm();
	};

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
					onSubmit={(event) => handleSubmit(event, formParameters)}>
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
						<Button
							title='Сбросить'
							type='reset'
							onClick={() => resetAction(resetFormParams)}
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
