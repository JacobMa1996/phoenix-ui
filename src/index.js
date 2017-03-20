import catBrowser from './utils/CatBrowser.js';
import 'phoenix-styles/less/phoenix-styles.less';

export Button from './Button';
export ButtonGroup from './ButtonGroup';
export Input from './Input';
export Textarea from './Textarea';
export Switch from './Switch';
export Row from './Row';
export Col from './Col';
export TableView from './TableView';
export FormGroup from './FormGroup';
export Tab from './Tab';
export Tabset from './Tabset';
export Label from './Label';
export Badge from './Badge';
export Star from './Star';
export Drag from './Drag';
export Swipe from './Swipe';
export Grid from './Grid';
export Dialog from './Modal/Dialog';
export Alert from './Modal/Alert';
export Prompt from './Modal/Prompt';
export Toast from './Toast';
export Popup from './Popup';
export Accordion from './Accordion';
export Popover from './Popover';
export Whisper from './Whisper';
export Slider from './Slider';
export Animate from './Animate';
export Icon from './Icon';
export Menu from './Menu/Menu';
export LoadingList from './LoadingList';
export PageTransition from './PageTransition';

//接入cat－browser
catBrowser({
    moduleName:'phoenix-ui',
    isOnlyDp:false
});
