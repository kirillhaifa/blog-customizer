import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import './styles/index.scss';
import styles from './styles/index.module.scss';
import {
	fontFamilyOptions,
	defaultArticleState,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
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

	const defaultStyle = {
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	} as CSSProperties;

	const handleReset = (resetFormParams: () => void) => {
		setStyle(defaultStyle);

		setSelectedFontFamily(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);

		resetFormParams();
	};

	const [style, setStyle] = useState(defaultStyle);

	return (
		<div className={clsx(styles.main)} style={style}>
			<ArticleParamsForm
				resetAction={handleReset}
				articleParams={articleParams}
				setStyle={setStyle}
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
