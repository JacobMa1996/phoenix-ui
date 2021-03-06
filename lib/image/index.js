'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utilsComponent = require('../utils/Component');

var _utilsComponent2 = _interopRequireDefault(_utilsComponent);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsTool = require('../utils/Tool');

var _utilsLogger = require('../utils/logger');

var _utilsLogger2 = _interopRequireDefault(_utilsLogger);

require('../style');

require('phoenix-styles/less/modules/image.less');

/**
 * 图片组件<br/>
 * - 和普通图片使用方式一致，src为必填选项，可自行添加alt属性。
 * - 可通过defaultSrc添加默认图片地址，在图片未加载出来之前显示。
 * - 可通过phSize设置图片大小，default为宽高和父级一致；cover为覆盖，不变形，没有空白区域；contain包含，不变形，可能有空白区域。
 * - 可通过lazy设置图片为懒加载的模式，当图片进入视口之后才开始加载，可配合ImageList使用。
 * - 可通过loadCallback设置图片加载完成的回调函数。
 * - cover和contain必须设置定高。
 *
 * 主要属性和接口：
 * - src: 图片地址。<br/>
 * 如：`<Image src={IMAGE_URL} alt='图片没有加载上的提示语'/>`
 * - defaultSrc: 默认图片地址。<br/>
 * 如：`<Image src={IMAGE_URL} defaultSrc={DEFAULT_URL}/>`
 * - phSize: 图片大小。<br/>
 * 如：`<Image src={IMAGE_URL} phSize='cover'/>`
 * - lazy: 是否懒加载<br/>
 * 如：`<Image src={IMAGE_URL} lazy/>`
 * - loadCallback: 图片加载完成的回调<br/>
 * 如：`<Image src={IMAGE_URL} loadCallback={(err)=>{if(!err) console.log('success!')}}/>`
 * 
 * @class Image
 * @module 基础组件
 * @extends Component
 * @constructor
 * @since 2.0.0
 * @demo image|image.js {展示}
 * @show true
 * */

var Images = (function (_Component) {
    _inherits(Images, _Component);

    _createClass(Images, null, [{
        key: 'propTypes',
        value: {
            /**
             * 样式前缀
             * @property classPrefix
             * @type String
             * @default 'image'
             * */
            classPrefix: _propTypes2['default'].string,
            /**
             * 图片地址
             * @property src
             * @type String
             * @default null
             * */
            src: _propTypes2['default'].string,
            /**
             * 默认图片地址
             * @property defaultSrc
             * @type String
             * @default null
             * */
            defaultSrc: _propTypes2['default'].string,
            /**
             * 图片大小，[default, cover, contain]
             * @property phSize
             * @type String
             * @default 'default'
             * */
            phSize: _propTypes2['default'].oneOf(['default', 'cover', 'contain']),
            /**
             * 是否懒加载
             * @property lazy
             * @type Boolean
             * @default false
             * */
            lazy: _propTypes2['default'].bool,
            /**
             * 图片加载完成的回调
             * @property loadCallback
             * @type Function
             * @default null
             * */
            loadCallback: _propTypes2['default'].func
        },
        enumerable: true
    }, {
        key: 'defaultProps',
        value: {
            src: null,
            defaultSrc: null,
            lazy: false,
            phSize: 'default',
            classPrefix: 'image',
            classMapping: {}
        },
        enumerable: true
    }]);

    function Images(props, context) {
        _classCallCheck(this, Images);

        _Component.call(this, props, context);

        new _utilsLogger2['default']('Image');

        this.load = false;

        // 对默认图片预加载
        this.defaultImagePreload();

        this.state = {
            src: props.defaultSrc || null
        };

        this.scrollHandle = this.scrollHandle.bind(this);
        if (props.lazy) window.addEventListener('scroll', this.scrollHandle, false);
    }

    Images.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var _this = this;

        var src = nextProps.src;
        var defaultSrc = nextProps.defaultSrc;
        var lazy = nextProps.lazy;

        if (this.state.src !== src) {
            this.load = false;

            this.setState({
                src: defaultSrc || null
            }, function () {
                if (nextProps.lazy) window.addEventListener('scroll', _this.scrollHandle, false);
                _this.isLazyCallback(nextProps);
            });
        }
    };

    Images.prototype.defaultImagePreload = function defaultImagePreload() {
        var defaultSrc = this.props.defaultSrc;

        if (defaultSrc) {
            var img = new Image();
            img.src = defaultSrc;
        }
    };

    Images.prototype.scrollHandle = function scrollHandle() {
        this.lazyLoad();
    };

    Images.prototype.lazyLoad = function lazyLoad() {
        this.scrollTop = _utilsTool.getScrollTop();
        this.bodyHeight = _utilsTool.getClientHeight();
        this.imageTop = this.phImage.offsetTop;

        if (this.scrollTop + this.bodyHeight >= this.imageTop) {
            console.log('lazyLoad');
            if (!this.load) {
                this.imageLoad(true);
            }
        }
    };

    Images.prototype.componentDidMount = function componentDidMount() {
        this.isLazyCallback(this.props);
    };

    Images.prototype.isLazyCallback = function isLazyCallback(props) {
        var lazy = props.lazy;

        if (lazy && !this.load) {
            this.lazyLoad();
        } else {
            this.imageLoad();
        }
    };

    Images.prototype.getImageSize = function getImageSize() {
        var phSize = this.props.phSize;

        switch (phSize) {
            case 'cover':
                if (this.imageWidth > this.imageHeight) {
                    this.image.style.height = '100%';
                } else {
                    this.image.style.width = '100%';
                }
                break;
            case 'contain':
                if (this.imageWidth > this.imageHeight) {
                    this.image.style.width = '100%';
                } else {
                    this.image.style.height = '100%';
                }
                break;
            default:
                this.image.style.width = '100%';
                this.image.style.height = '100%';
        }
    };

    Images.prototype.imageLoad = function imageLoad(isLazy) {
        var _this2 = this;

        var _props = this.props;
        var src = _props.src;
        var loadCallback = _props.loadCallback;

        try {
            var _ret = (function () {
                var img = new Image();
                img.src = src;

                _this2.load = true;
                console.log(src);
                if (img.complete) {
                    // 如果已经存在，直接加载
                    _this2.loadSuccessCallback(img, isLazy);
                    return {
                        v: undefined
                    };
                }

                img.onload = function (e) {
                    // 否则等到图片加载完成
                    img.onload = null;
                    _this2.loadSuccessCallback(img, isLazy);
                };
            })();

            if (typeof _ret === 'object') return _ret.v;
        } catch (err) {
            if (loadCallback) loadCallback(err);
        }
    };

    Images.prototype.loadSuccessCallback = function loadSuccessCallback(img, isLazy) {
        var _props2 = this.props;
        var src = _props2.src;
        var lazy = _props2.lazy;
        var loadCallback = _props2.loadCallback;

        if (lazy) window.removeEventListener('scroll', this.scrollHandle, false);

        this.isLazy = isLazy;

        this.setState({ src: src });

        this.imageWidth = img.width;
        this.imageHeight = img.height;

        this.getImageSize();
        if (loadCallback) loadCallback();
    };

    Images.prototype.componentWillUnmount = function componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollHandle, false);
    };

    Images.prototype.renderImage = function renderImage() {
        var _this3 = this;

        var _props3 = this.props;
        var className = _props3.className;
        var style = _props3.style;
        var alt = _props3.alt;
        var children = _props3.children;

        return _react2['default'].createElement(
            'div',
            { className: _classnames2['default'](this.getProperty(true), className),
                ref: function (phImage) {
                    _this3.phImage = phImage;
                },
                style: this.getStyles(style)
            },
            _react2['default'].createElement('img', _extends({}, this.otherProps, { className: '', src: this.state.src, ref: function (image) {
                    _this3.image = image;
                } }))
        );
    };

    Images.prototype.render = function render() {
        return this.renderImage();
    };

    return Images;
})(_utilsComponent2['default']);

exports['default'] = Images;
module.exports = exports['default'];