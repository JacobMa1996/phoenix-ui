'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsComponent = require('./utils/Component');

var _utilsComponent2 = _interopRequireDefault(_utilsComponent);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsTool = require('./utils/Tool');

var _Drag = require('./Drag');

var _Drag2 = _interopRequireDefault(_Drag);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

/**
 * 左滑组件<br/>
 * - 向左滑动出现可操作按钮, 类似IOS列表操作的组件。
 * - 通过buttons设置可操作按钮的文字text、样式phStyle以及点击按钮的回调函数onHandle。
 * - buttons的phStyle默认'primary', 可选primary、info、error、warning、danger、link、gray、success。
 *
 * 示例:
 * ```code
 *     <Swipe buttons={[
 *         {text: '删除', onHandle: this.onDelete, phStyle: 'error'},
 *         {text: '取消', onHandle: this.onCancle, phStyle: 'info'}
 *     ]}>
 *         <div style={{padding: '1rem'}}>
 *             // 内容
 *         </div>
 *     </Swipe>
 * ```
 *
 * @class Swipe
 * @module 操作类组件
 * @extends Component
 * @constructor
 * @since 0.3.0
 * @demo swipe|swipe.js {展示}
 * @show true
 * */

var Swipe = (function (_Component) {
    _inherits(Swipe, _Component);

    _createClass(Swipe, null, [{
        key: 'propTypes',
        value: {
            /**
             * 样式前缀
             * @property classPrefix
             * @type String
             * @default 'swipe'
             * */
            classPrefix: _react.PropTypes.string,
            /**
             * 标签tagName
             * @property componentTag
             * @type String
             * */
            componentTag: _react.PropTypes.string,
            /**
             * 按钮组
             * @property buttons
             * @type Array
             * */
            buttons: _react.PropTypes.array
        },
        enumerable: true
    }, {
        key: 'defaultProps',
        value: {
            buttons: [],
            classPrefix: 'swipe',
            componentTag: 'div',
            classMapping: {}
        },
        enumerable: true
    }]);

    function Swipe(props, context) {
        _classCallCheck(this, Swipe);

        _Component.call(this, props, context);

        this.state = {
            translateX: -1,
            preTranslateX: -1,
            btnsWidth: 0,
            isBtnsShow: false,
            OPE_RANGE: 10
        };
    }

    Swipe.prototype.renderOperationButton = function renderOperationButton(buttons) {
        var buttonsDom = [];

        if (buttons.length != 0) buttonsDom.push(this.renderButtonByType(buttons));

        return buttonsDom;
    };

    Swipe.prototype.renderButtonByType = function renderButtonByType(btnInfo) {
        var _this = this;

        return _react2['default'].createElement(
            'div',
            { className: _utilsTool.setPhoenixPrefix("swipe-btns"), key: 'buttons', ref: function (buttons) {
                    _this.buttons = buttons;
                } },
            btnInfo.map(function (item, index) {
                return _react2['default'].createElement(
                    _Button2['default'],
                    { key: index, phStyle: item.phStyle || 'primary' },
                    item.text
                );
            })
        );
    };

    Swipe.prototype.componentDidMount = function componentDidMount() {
        // 获取btns的宽度
        if (this.buttons) this.state.btnsWidth = this.buttons.offsetWidth;
    };

    Swipe.prototype.onDrag = function onDrag(event, position) {
        // position.start position.move
        var target = event.currentTarget;
        this.state.translateX = position.move.x - position.start.x + this.state.preTranslateX;

        if (position.move.x < position.start.x) {
            this.state.isBtnsShow = true;
        } else {
            this.state.isBtnsShow = false;
        }

        if (this.state.translateX >= 0) this.state.translateX = 0;
        if (this.state.translateX <= -this.state.btnsWidth) this.state.translateX = -this.state.btnsWidth;

        target.style.transform = 'translateX(' + this.state.translateX + 'px)';
    };

    Swipe.prototype.onDrop = function onDrop(event, position) {
        // position.end
        var target = event.currentTarget;

        if (Math.abs(this.state.translateX) < 10) {
            // 微弱操作保持不变
            this.state.isBtnsShow = !this.state.isBtnsShow;

            if (this.state.isBtnsShow) {
                this.state.translateX = 0;
            } else {
                this.state.translateX = -this.state.btnsWidth;
            }
        } else {
            if (this.state.isBtnsShow) {
                this.state.translateX = -this.state.btnsWidth;
            } else {
                this.state.translateX = 0;
            }
        }
        // console.log(this.state.isBtnsShow);

        this.state.preTranslateX = this.state.translateX;
        target.style.transform = 'translateX(' + this.state.translateX + 'px)';
    };

    Swipe.prototype.render = function render() {
        var _props = this.props;
        var Component = _props.componentTag;
        var buttons = _props.buttons;
        var className = _props.className;

        return _react2['default'].createElement(
            Component,
            { className: _classnames2['default'](this.getProperty(true), className), style: this.getStyles(this.props.style) },
            _react2['default'].createElement(
                _Drag2['default'],
                { className: _utilsTool.setPhoenixPrefix("swipe-content"), onDrag: this.onDrag.bind(this), onDrop: this.onDrop.bind(this) },
                this.props.children
            ),
            this.renderOperationButton(buttons)
        );
    };

    return Swipe;
})(_utilsComponent2['default']);

exports['default'] = Swipe;
module.exports = exports['default'];