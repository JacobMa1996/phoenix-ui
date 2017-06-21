import React,{PropTypes} from 'react'
import Component from './utils/Component'
import classnames from 'classnames'
import {setPhoenixPrefix} from './utils/Tool';

import Input from './Input'
import Button from './Button'

/**
 * SearchBar<br/>
 * - 
 *
 * 主要属性和接口：
 * 
 *
 * @class SearchBar
 * @module 搜索组件
 * @extends Component
 * @constructor
 * @since 2.0.0
 * @demo search-bar|search-bar.js {展示}
 * @show true
 * */

export default class SearchBar extends Component{
    static propTypes = {
        /**
         * 样式前缀
         * @property classPrefix
         * @type String
         * @default 'search-bar'
         * */
        classPrefix: PropTypes.string,
        buttonText: PropTypes.string,
        /**
         * 搜索的回调
         * @method queryCallback
         * @type Function
         * */
        queryCallback: PropTypes.func,
        /**
         * 点击按钮的回调
         * @method clickCallback
         * @type Function
         * */
        clickCallback: PropTypes.func,
    };

    static defaultProps ={
        buttonText: '取消',
        placeholder: '搜索',
        classPrefix:'search-bar',
        classMapping : { 
        }
    };

    constructor(props,context){
        super(props,context);

        this.state = {
            focus: false
        }
    }

    renderButton(){
        let {buttonText} = this.props
        
        if(this.state.focus){
            return <Button phStyle="link" onClick={this.buttonHandle.bind(this)}>{buttonText}</Button>
        }
    }

    buttonHandle(){
        let {clickCallback} = this.props
        if(clickCallback) clickCallback()
    }

    onFocus(){
        this.setState({
            focus: true
        })
    }

    onBlur(){
        this.timer = setTimeout(()=>{
            this.setState({
                focus: false
            })
        },0)
    }

    onKeyDown(e){
        let {queryCallback} = this.props

        if(e.keyCode == '13'){
            if(queryCallback) queryCallback(this.searchElem.getValueCallback())
        }
    }

    render(){
        let {className,placeholder} = this.props

        return(
            <div className={classnames(
               this.getProperty(true),
               className,
               this.state.focus? setPhoenixPrefix('search-bar-focus'):''
           )}>
               <Input type="search" phIcon="search" placeholder={placeholder} clear 
                    ref={(searchElem)=>{this.searchElem=searchElem}}
                    onFocus={this.onFocus.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    onKeyDown={this.onKeyDown.bind(this)}
               />
               {this.renderButton()}
           </div>
        )
    }
}