import { createRoot } from 'react-dom/client';
import { StrictMode, useState } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import './styles/index.scss';
import styles from './styles/index.module.scss';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultStyle,
} from 'src/constants/articleProps';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	//состояния статьи
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

	//состояния статьи собранные в объект
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

	const [style, setStyle] = useState(defaultStyle);

	return (
		<div className={clsx(styles.main)} style={style}>
			<ArticleParamsForm articleParams={articleParams} setStyle={setStyle} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
