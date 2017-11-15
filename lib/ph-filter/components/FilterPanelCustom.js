'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _FilterPanelBase = require('./FilterPanelBase');

var _FilterPanelBase2 = _interopRequireDefault(_FilterPanelBase);

/**
 * 简单面板<br/>
 * - 可通过selected设置选中的项目，格式如`{key:'ljz',value:'陆家嘴'}`。
 * - 可通过default设置没有选项时的默认显示文字。
 * - 可通过readOnly设置当前面板是否为只读模式。
 * - 可通过buttons设置底部按钮组的样式、文字、回调等，格式如`[{text:'取消', phStyle:'info', onHandle:this.cancelChoose.bind(this), otherProps: {hollow:true}}]`。
 *
 * 主要属性和接口：
 * - selected: 默认打开的面板。
 * - default: 是否显示筛选头部。
 * - readOnly: 有效选择的回调。
 * - buttons: 有效选择的回调。
 * 
 * 如：
 * ```code
 *  this.state = {
 *      panel1:[
 *          {key:'sndq',value:'上南地区'},
 *          {key:'ljz',value:'陆家嘴'},
 *          {key:'bbb',value:'八佰伴'},
 *          {key:'pdxq',value:'浦东新区'}
 *      ]
 *  }
 * ...
 *  const buttons = [
 *      {onHandle: this.onSubmit.bind(this)}
 *  ]
 * ...
 *  <FilterContainer>
 *      <PanelSimple readOnly selected={{key:'ljz',value:'陆家嘴'}} buttons={buttons}>
 *          {
 *              this.state.panel1.map(function(item){
 *                  return <Item key={item.key} itemKey={item.key}>{item.value}</Item>
 *              })
 *          }
 *      </PanelSimple>
 *  </FilterContainer>
 * ```
 *
 * @class FilterPanelCustom
 * @module 筛选控件
 * @extends Component
 * @constructor
 * @since 2.2.0
 * @demo ph-filter|ph-filter.js {展示}
 * @show true
 * */

var FilterPanelCustom = (function (_PanelBase) {
    _inherits(FilterPanelCustom, _PanelBase);

    _createClass(FilterPanelCustom, null, [{
        key: 'propTypes',
        value: {
            /**
             * 当不设置panel的选中项时（不选择任何item），可以设置一个默认字符展示在filter上
             * @property default
             * @type String
             * */
            'default': _react.PropTypes.string,
            /**
             * panel是否为只读模式
             * @property readOnly
             * @type Boolean
             * */
            readOnly: _react.PropTypes.bool,
            /**
            * 按钮数组
            * @property buttons
            * @type Array
            * */
            buttons: _react.PropTypes.array
        },
        enumerable: true
    }, {
        key: 'defaultProps',
        value: {
            selected: null,
            readOnly: false,
            buttons: null,
            'default': ''
        },
        enumerable: true
    }]);

    function FilterPanelCustom(props, context) {
        _classCallCheck(this, FilterPanelCustom);

        _PanelBase.call(this, props, context);
    }

    FilterPanelCustom.prototype.render = function render() {
        var _props = this.props;
        var className = _props.className;
        var buttons = _props.buttons;
        var children = _props.children;

        return this.props.show ? _react2['default'].createElement(
            'div',
            { className: _classnames2['default'](className ? className : '', 'ph-filter-selector', buttons ? 'ph-filter-selector-buttons' : '') },
            children,
            this.renderButtons()
        ) : null;
    };

    return FilterPanelCustom;
})(_FilterPanelBase2['default']);

exports['default'] = FilterPanelCustom;
module.exports = exports['default'];