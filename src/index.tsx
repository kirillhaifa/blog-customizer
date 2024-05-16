import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, FormEvent } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import {
	ArticleParamsForm,
	ParamsType,
} from './components/article-params-form/ArticleParamsForm';
import './styles/index.scss';
import styles from './styles/index.module.scss';
import {
	fontFamilyOptions,
	defaultArticleState,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
} from 'src/constants/articleProps';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	//стейты параметров статьи
	const [selectedFontFamily, setSelectedFontFamily] = useState(
		fontFamilyOptions[0]
	);
	const [selectedFontSize, setSelectedFontSize] = useState(fontSizeOptions[0]);
	const [selectedFontColor, setSelectedFontColor] = useState(fontColors[0]);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		backgroundColors[0]
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState(
		contentWidthArr[0]
	);

	//параметры и функции установки параметров статьи собранные в объект
	const articleParams = {
		fontFamily: {
			selectedOption: selectedFontFamily,
			selectOption: setSelectedFontFamily,
		},
		fontSize: {
			selectedOption: selectedFontSize,
			selectOption: setSelectedFontSize,
		},
		fontColor: {
			selectedOption: selectedFontColor,
			selectOption: setSelectedFontColor,
		},
		backgroundColor: {
			selectedOption: selectedBackgroundColor,
			selectOption: setSelectedBackgroundColor,
		},
		contentWidth: {
			selectedOption: selectedContentWidth,
			selectOption: setSelectedContentWidth,
		},
	};

	//стейты формы
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

	//параметры и функции установки параметров формы собранные в объект
	const formParams = {
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

	//дефолтные стили, для удобства передачи
	const defaultStyle = {
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	} as CSSProperties;

	//сабмит формы
	const handleSubmit = (
		evt: FormEvent<HTMLFormElement>,
		toggleForm: () => void
	) => {
		evt.preventDefault();
		setStyle({
			'--font-family': selectedFontFamily.value,
			'--font-size': articleParams.fontSize.selectedOption.value,
			'--font-color': articleParams.fontColor.selectedOption.value,
			'--container-width': articleParams.contentWidth.selectedOption.value,
			'--bg-color': articleParams.backgroundColor.selectedOption.value,
		} as CSSProperties);
		toggleForm();
	};

	//функция обновления селекта
	const handleSelectChange = (
		optionKey: keyof ParamsType,
		selectedOption: OptionType
	) => {
		formParams[optionKey].selectOption(selectedOption);
		articleParams[optionKey].selectOption(selectedOption);
	};

	//ресет формы и параметров статьи
	const handleReset = () => {
		//ставим дефолтные стили
		setStyle(defaultStyle);

		//обновляем стейты стилей
		setSelectedFontFamily(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);

		//обновляем стейты формы
		setSelectedFontFamilyFormOption(defaultArticleState.fontFamilyOption);
		setSelectedFontSizeFormOption(defaultArticleState.fontSizeOption);
		setSelectedFontColorFormOption(defaultArticleState.fontColor);
		setSelectedBackgroundColorFormOption(defaultArticleState.backgroundColor);
		setSelectedContentWidthFormOption(defaultArticleState.contentWidth);
	};

	const [style, setStyle] = useState(defaultStyle);

	return (
		<div className={clsx(styles.main)} style={style}>
			<ArticleParamsForm
				resetAction={handleReset} //дейстиве при ресете
				submitAction={handleSubmit} //дейстивие при сабмите
				changeAction={handleSelectChange} //дейстивие при смене значения на селекте
				formParameters={formParams} //текущие параметры формы для отрисовки
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
