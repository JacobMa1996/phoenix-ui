import React,{PropTypes} from 'react';
import Component from './utils/Component';
import classnames from 'classnames';
import {setPhoenixPrefix} from './utils/Tool';

import Icon from './Icon';

/**
 * <h5>操作类组件，主要包括组件:</h5>
 * <strong><a href='../classes/Accordion.html'>Accordion 手风琴</a></strong><br/>
 * <strong><a href='../classes/Toast.html'>Toast 飘字</a></strong><br>
 * <strong><a href='../classes/Popup.html'>Popup 弹层</a></strong><br>
 * <strong><a href='../classes/Slider.html'>Slider 滑动输入条</a></strong><br>
 * <strong><a href='../classes/Swipe.html'>Swipe 左滑动</a></strong><br>
 * <strong><a href='../classes/Menu.html'>Menu 菜单</a></strong><br>
 * <strong><a href='../classes/LoadingList.html'>LoadingList 加载更多</a></strong><br>
 * <h6>点击以上链接或者左侧导航栏的组件名称链接进行查看</h6>
 * @module 操作类组件
 * @main 操作类组件
 * @static
 */
/**
 * 手风琴组件<br/>
 * - 通过visible设置初始展开或收起的状态, 可选true/false。
 * - 可通过onAccordionChange设置展开收起时额外的回调函数。
 * - 可通过hideIcon设置隐藏向下的箭头。
 *
 * 主要属性和接口：
 * - visible:初始展开或收起的状态, 默认false收起。
 * = hideIcon:设置隐藏向下的箭头, 默认false可见。<br/>
 * 如：
 * ```code
 *     <Accordion visible={true} hideIcon>
 *         <Accordion.Header>
 *             标题一
 *         </Accordion.Header>
 *         <Accordion.Body>
 *             ...
 *         </Accordion.Body>
 *     </Accordion>
 * ```
 * - onAccordionChange:点击收起展开的额外的回调执行函数。<br/>
 * 如：
 * ```code
 *     <Accordion onAccordionChange={(visible)=>{console.log(visible);}}>
 *         <Accordion.Header>
 *             标题一
 *         </Accordion.Header>
 *         <Accordion.Body>
 *             ...
 *         </Accordion.Body>
 *     </Accordion>
 * ```
 *
 * @class Accordion
 * @module 操作类组件
 * @extends Component
 * @constructor
 * @since 0.4.0
 * @demo accordion|accordion.js {展示}
 * @show true
 * */

class Accordion extends Component{

    static propTypes = {
        /**
         * 样式前缀
         * @property classPrefix
         * @type String
         * @default 'accordion'
         * */
        classPrefix: PropTypes.string,
        /**
         * 标签tagName
         * @property componentTag
         * @type String
         * */
        componentTag:PropTypes.string,
        /**
         * 是否可见标识
         * @property visible
         * @type Boolean
         * @default false
         * */
        visible: PropTypes.bool,
        /**
         * 点击收起展开的回调函数
         * @method onAccordionChange
         * @type Function
         * */
        onAccordionChange: PropTypes.func,
        /**
         * 向下的箭头是否可见， 默认可见
         * @property hideIcon
         * @type Boolean
         * @default false
         * */
        hideIcon: PropTypes.bool
    };

    static defaultProps = {
        visible: false,
        hideIcon: false,
        classPrefix:'accordion',
        componentTag:'div',
        classMapping : {}
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            visible: props.visible
        }
    }

    componentWillReceiveProps(nextProps){
         if(this.state.visible != nextProps.visible) this.setState({visible: nextProps.visible});
    }

    changeVisible(){
        this.setState({
            visible: !this.state.visible
        }, ()=>{
            if(this.props.onAccordionChange) this.props.onAccordionChange(this.state.visible);
        });
    }

    renderChildren(){
        let _this = this;
        let newChildren = [];
        let {hideIcon} = this.props;

        React.Children.forEach(this.props.children, function(child, index){
            newChildren.push(React.cloneElement(child,{
                key: index,
                hideIcon: hideIcon,
                visible: _this.state.visible,
                changeVisible: _this.changeVisible.bind(_this)
            }));
        });

        return newChildren;
    }

    render(){
        let {componentTag:Component, className} = this.props;

        return (
            <Component {...this.props} className={classnames(
                this.getProperty(true),
                className
            )}>
                {this.renderChildren()}
            </Component>
        );
    }
}

class AccordionHeader extends Component {
    constructor(props, context){
        super(props, context);
    }

    onAccordionHeaderChange(){
        this.props.changeVisible();
    }

    renderIcon(){
        let {visible, hideIcon} = this.props;

        if(!hideIcon){
            return <Icon phIcon="expand-more" className={visible? 'active':''} />;
        }else{
            return '';
        }        
    }

    render(){
        let {className} = this.props;

        return (
            <div className={classnames(
                    setPhoenixPrefix('accordion-header'),
                    className
                )}
                onClick={::this.onAccordionHeaderChange}
                {...this.props}
            >
                {this.props.children}
                {this.renderIcon()}
            </div>
        );
    }
};

class AccordionBody extends Component{

    constructor(props, context) {
        super(props, context);

        this.height = 0;
    }

    componentDidMount(){
        setTimeout(()=>{
            this.height =  this.accordionBody.offsetHeight+'px';
            this.setHeight();
        },0);
    }

    componentDidUpdate(){
        this.setHeight();
    }

    setHeight(){
        this.accordionBodyParent.style.height = this.props.visible ? this.height : 0;
    }

    render(){
        let {visible,children,className} = this.props;

        return (
            <div {...this.props} className={classnames(
                    setPhoenixPrefix('accordion-body'),
                    'animated',
                    className
                )} ref={(accordionBodyParent)=>{this.accordionBodyParent = accordionBodyParent;}}>
                <div ref={(accordionBody)=>{this.accordionBody = accordionBody;}}>
                    {children}
                </div>
            </div>
        );
    }
}

Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;

export default Accordion;