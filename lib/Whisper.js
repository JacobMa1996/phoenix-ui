'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utilsComponent = require('./utils/Component');

var _utilsComponent2 = _interopRequireDefault(_utilsComponent);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

/**
 * <h5>提示模块，主要包括一下两个组件:</h5>
 * <strong><a href='../classes/Whisper.html'>Whisper</a></strong><br/>
 * <strong><a href='../classes/Popover.html'>Popover</a></strong><br>
 * <h6>点击以上链接或者左侧导航栏的组件名称链接进行查看</h6>
 * @module 提示组件
 * @main 提示组件
 * @static
 *
 */

/**
 * 倾听者组件<br/>
 * - 配合提示组件使用, 通过target设置显示的目标。
 * - 可通过placement设置目标物的显示位置, 可选top、bottom、left、right、top left、top right、bottom left、bottom right。
 * - 可通过distance设置目标物到点击对象(倾听者)的位置。
 * - 可通过onTargetChange定义目标物显隐时额外的回调函数。
 *
 * 主要属性和接口：
 * - target:目标物。
 * - placement:目标物的显示位置, 默认bottom。
 * - distance:目标物到点击对象(倾听者)的位置, 默认15。
 * - onTargetChange:目标物显隐时额外的回调函数。
 *
 * 示例:
 * ```code
 *     const popover = ( // 可以通过style自定义位置
 *         <Popover>
 *             <ul className="ph-popover-list">
 *                 <li className="ph-popover-item">未上线单店</li>
 *                 <li className="ph-popover-item">未上线连锁店</li>
 *             </ul>
 *         </Popover>
 *     );
 * ```
 * ```code
 *     <Whisper placement="top" onTargetChange={()=>{console.log('气泡出现消失时额外的执行函数');}} target={popover} distance={10} >Top</Whisper>
 * ```
 *
 * @class Whisper
 * @module 提示组件
 * @extends Component
 * @constructor
 * @since 1.0.0
 * @demo popover|popover.js {展示}
 * @show true
 * */

var Whisper = (function (_Component) {
    _inherits(Whisper, _Component);

    _createClass(Whisper, null, [{
        key: 'propTypes',
        value: {
            /**
             * 样式前缀
             * @property classPrefix
             * @type String
             * @default 'whisper'
             * */
            classPrefix: _react.PropTypes.string,
            /**
             * 标签tagName
             * @property componentTag
             * @type String
             * */
            componentTag: _react.PropTypes.string,
            /**
             * 显示的目标气泡
             * @property target
             * @type Object
             * */
            target: _react.PropTypes.object,
            /**
             * 气泡的位置,默认bottom
             * @property placement
             * @type String
             * */
            placement: _react.PropTypes.string,
            /**
             * 气泡距离点击物的位置,默认15
             * @property distance
             * @type Number
             * */
            distance: _react.PropTypes.number,
            /**
             * 气泡显隐时可执行的额外函数,自定义
             * @method onTargetChange
             * @type Function
             * */
            onTargetChange: _react.PropTypes.func
        },
        enumerable: true
    }, {
        key: 'defaultProps',
        value: {
            distance: 15,
            placement: 'bottom',
            classPrefix: 'whisper',
            componentTag: 'div',
            classMapping: {}
        },
        enumerable: true
    }]);

    function Whisper(props, context) {
        _classCallCheck(this, Whisper);

        _Component.call(this, props, context);

        this.visible = false;
        this._layer = document.createElement('div');
    }

    Whisper.prototype.componentDidMount = function componentDidMount() {
        var _this = this;

        setTimeout(function () {
            _this.getWhisperPosition();
        }, 0);
    };

    Whisper.prototype.getWhisperPosition = function getWhisperPosition() {
        this.position = {};
        this.size = {};

        this.position.x = parseInt(this.whisper.offsetLeft);
        this.position.y = parseInt(this.whisper.offsetTop);

        this.size.width = parseInt(this.whisper.offsetWidth);
        this.size.height = parseInt(this.whisper.offsetHeight);

        this.calcTooltipPosition();
    };

    Whisper.prototype.calcTooltipPosition = function calcTooltipPosition() {
        var ARROW_SIZE = this.props.distance;
        var winWidth = parseInt(document.body.clientWidth),
            winHeight = parseInt(document.body.clientHeight);

        document.body.style.position = 'relative';
        this.style = {};

        switch (this.props.placement) {
            case 'top':
                this.style.bottom = winHeight - this.position.y + ARROW_SIZE;
                this.style.left = this.position.x + this.size.width / 2;
                break;
            case 'bottom':
                this.style.top = this.position.y + this.size.height + ARROW_SIZE;
                this.style.left = this.position.x + this.size.width / 2;
                break;
            case 'left':
                this.style.right = winWidth - this.position.x + ARROW_SIZE;
                this.style.top = this.position.y + this.size.height / 2;
                break;
            case 'right':
                this.style.left = this.position.x + this.size.width + ARROW_SIZE;
                this.style.top = this.position.y + this.size.height / 2;
                break;
            case 'top left':
                this.style.bottom = winHeight - this.position.y + ARROW_SIZE;
                this.style.left = this.position.x;
                break;
            case 'top right':
                this.style.bottom = winHeight - this.position.y + ARROW_SIZE;
                this.style.right = winWidth - this.position.x - this.size.width;
                break;
            case 'bottom left':
                this.style.top = this.position.y + this.size.height + ARROW_SIZE;
                this.style.left = this.position.x;
                break;
            case 'bottom right':
                this.style.top = this.position.y + this.size.height + ARROW_SIZE;
                this.style.right = winWidth - this.position.x - this.size.width;
                break;
            default:
                this.style.top = 0;
                this.style.left = 0;
        }
    };

    Whisper.prototype.onToggle = function onToggle() {
        this.visible = !this.visible;

        if (this.visible) {
            this.renderTarget();
        } else {
            this.removeTarget();
        }

        if (this.props.onTargetChange) this.props.onTargetChange();
    };

    Whisper.prototype.onClose = function onClose() {
        this.visible = false;
        this.removeTarget();
    };

    Whisper.prototype.getTarget = function getTarget() {
        return _react.cloneElement(this.props.target, {
            styles: this.style,
            placement: this.props.placement,
            onClose: this.onClose.bind(this),
            whisper: this.whisper,
            setVisible: this.setVisible
        });
    };

    Whisper.prototype.renderTarget = function renderTarget() {
        var newTarget = this.getTarget();

        _reactDom2['default'].unstable_renderSubtreeIntoContainer(this, newTarget, this._layer);
        document.body.appendChild(this._layer);
    };

    Whisper.prototype.removeTarget = function removeTarget() {
        _reactDom2['default'].unmountComponentAtNode(this._layer);
        document.body.removeChild(this._layer);
    };

    Whisper.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.visible) this.onClose();
    };

    Whisper.prototype.render = function render() {
        var _this2 = this;

        var _props = this.props;
        var className = _props.className;
        var children = _props.children;

        return _react2['default'].createElement(
            'div',
            _extends({}, this.props, {
                className: _classnames2['default'](this.getProperty(true), className),
                onClick: this.onToggle.bind(this),
                ref: function (whisper) {
                    _this2.whisper = whisper;
                }
            }),
            children
        );
    };

    return Whisper;
})(_utilsComponent2['default']);

exports['default'] = Whisper;
module.exports = exports['default'];