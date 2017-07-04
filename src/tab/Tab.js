import React, {PropTypes,Component} from 'react'
import ClassNameMixin from '../utils/ClassNameMixin'
import {setPhPrefix} from '../utils/Tool'
import classnames from 'classnames'

/**
 * tab选项卡组件<br/>
 * - 通过heading设置选项卡的显示内容。
 * - 可通过onTabChange设置点击选项卡的回调函数。
 * - 可自定义className等常用属性以及事件。
 *
 * 具体属性和接口如下：
 * - heading:选项卡的显示内容, 默认'tab'
 * - onTabChange:点击事件的回调函数
 *
 * 示例:
 * ```code
 *     <Tabset activeIndex ={this.state.index} tabCallback={(index)=>{console.log(index);}>
 *         <Tab heading='标题1' className='tab-test'>
 *             横向内容1
 *         </Tab>
 *         <Tab heading='标题2' onTabChange={(index)=>{console.log(index);}>
 *             横向内容2
 *         </Tab>
 *     </Tabset>
 * ```
 *
 * @class Tab
 * @module 选项卡
 * @extends Component
 * @constructor
 * @since 0.1.0
 * @demo tab|tab.js{展示}
 * @show true
 * */

@ClassNameMixin
export default class Tab extends Component {
    static ProTypes = {
        /**
         * 选项卡的标题文字，默认为‘tab’
         * @property heading
         * @type String
         * @default 'tab'
         * */
        heading: PropTypes.string,
        /**
         * 点击事件的回调函数
         * @method onTabChange
         * @type Function
         * @default null
         * */
        onTabChange: PropTypes.func
    };

    static defaultProps = {
        heading: 'tab',
        activeIndex:0,
        vertical:false,
        onTabChange: null
    };

    constructor(props,context){
        super(props,context);
    }

    handleClick(){
        this.props.changeActive(this.props.index);
        this.props.onTabChange && this.props.onTabChange(this.props.index);
    }

    isActive(){
        return this.props.index == this.props.activeIndex ? 'active':'';
    }

    isVertical(){
        return !!this.props.vertical ? '':setPhPrefix('col');
    }

    render(){
        let {className,onClick,...other} = this.props;
        return(
            <li className={
                classnames(
                    this.isVertical(),
                    setPhPrefix('tab-nav'),
                    this.isActive(),
                    className
                )
            } onClick={::this.handleClick} {...other}>
                <a href="javascript:;">{this.props.heading}</a>
            </li>
        )
    }
}