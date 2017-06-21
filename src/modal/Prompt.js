import React,{PropTypes} from 'react';
import Component from '../utils/Component';
import classnames from 'classnames';
import {setPhoenixPrefix} from '../utils/Tool';

import ButtonGroup from '../ButtonGroup';
import Button from '../Button';
import Input from '../Input';
import Dialog from './Dialog';

/**
 * Prompt组件<br/>
 * - 由于弹框的显示操作在组件以外, 所以需要在使用时自定义`visible`、`onClose`函数。
 * - 可通过title设置弹出框标题，content设置内容，buttons设置尾部按钮。(相对Dialog新增参数)
 * - 按钮默认有[取消, 确定]2个按钮，点击[取消]默认的执行函数是直接关闭，点击[确定]通过传入的onConfirm函数可获取input的value数组，可自行添加回调。。
 * - 通过visible设置弹框是否显示, 可选true/false, 必需。
 * - 可通过onClose配置点击弹框阴影部分以及弹框右上角X按钮来关闭弹框。
 * - 可通过closeButton来配置弹框右上角X按钮是否显示, 默认不显示。
 * - 默认传了onClose之后阴影部分就具备点击关闭弹框的按钮, 如果需要去掉该功能需要额外传shadowDisabled作为标识。
 *
 * 主要属性和接口：
 * - title:弹框的标题，必需。
 * - content:弹框的内容，必需。
 * - buttons:尾部按钮的内容，必需是数组的形式，text标识填充的问题，phStyle表示主题，onHandle表示点击按钮的回调，otherProps传递按钮的其他属性，如{active:true, block:true, hollow: true}。
 * - onConfirm:点击确定按钮的回调，返回input的value。
 * - visible:弹框是否显示标识, 默认false不可见。
 * - onClose:关闭弹框的功能函数。
 * - closeButton:右上角关闭按钮是否显示的标识, 默认不显示。
 * - shadowDisabled:阴影部分是否可点击关闭按钮, 默认传了onClose函数就可以关闭。
 *
 * 示例:
 * ```code
 *      const buttons = [
            {text: "取消", phStyle: "gray", otherProps: {hollow: true}}, // text默认"确定", phStyle默认primary，onHandle默认onClose
            {text: "确定", onHandle: this.onConfirm}
        ];
        ...
 *      <Prompt closeButton shadowDisabled visible={this.state.visible} onClose={::this.onClose.bind(this,'visible')} 
 *          title="这是标题" content="这里是弹出框的内容..." buttons={buttons} />
 * ```
 *
 * @class Prompt
 * @module 弹出框组件
 * @extends Component
 * @constructor
 * @since 1.5.0
 * @demo prompt|prompt.js {展示}
 * @show true
 * */

export default class Prompt extends Component{

    static propTypes = {
        /**
         * 标题
         * @property title
         * @type String
         * */
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        /**
         * 内容
         * @property title
         * @type String
         * */
        content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        /**
         * 尾部按钮
         * @property buttons
         * @type Array
         * */
        buttons: PropTypes.array,
        /**
         * 内容区域文本框
         * @property buttons
         * @type Array
         * */
        inputs: PropTypes.array,
        /**
         * 是否可见标识
         * @property visible
         * @type Boolean
         * */
        visible: PropTypes.bool,
        /**
         * 关闭弹框的执行函数
         * @method onClose
         * @type Function
         * */
        onClose: PropTypes.func,
         /**
         * 点击确定的回调函数
         * @method onConfirm
         * @type Function
         * */
        onConfirm: PropTypes.func, 
        /**
         * 右上角按钮是否可见, 默认不可见
         * @property closeButton
         * @type Boolean
         * */
        closeButton: PropTypes.bool,
        /**
         * 阴影部分是否点击可关闭弹框, 默认传了onClose之后可关闭
         * @property shadowDisabled
         * @type Boolean
         * */
        shadowDisabled: PropTypes.bool,
    };

    static defaultProps = {
        visible: false
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            inputValue: []
        };
        this.inputValue = [];

        this.buttons = [
            {text: "取消", onHandle: props.onClose},
            {text: "确定", onHandle: this.onConfirm.bind(this)}
        ];
        this.inputs = [
            {type: "text", placeholder: "请输入"}
        ];
    }

    onConfirm(){ // 用于默认情况下 确定 按钮的回调，用户自定义。
        if(this.props.onConfirm) this.props.onConfirm(this.state.inputValue);
    }

    setValue(key, e){
        let o ={};
        o[key || e.target.name] = e.target.value;
        this.setState(o);
    }

    renderContent(){
        if(!this.props.visible) return;
        let _this = this;
        let {inputs} = this.props;
        if(inputs) this.inputs = inputs;

        return (
            <div>
                {
                    this.inputs.map((input,index) => {
                        return <Input key={index} {...input} type={input.type || "text"} defaultValue={input.defaultValue} 
                            value={_this.state.inputValue[index]} onChange={(e)=>{
                                this.inputValue[index] = e.target.value;
                                this.setState({
                                    inputValue: this.inputValue
                                });
                                if(input.onChange) input.onChange(e.target.value);
                            }} />;
                    })
                }
            </div>
        );
    }

    renderButtons(){
        let _this = this;
        let {buttons, onClose} = this.props;
        if(buttons) this.buttons = buttons;
        let buttonsType = this.buttons.length>2;
        
        return (
            <ButtonGroup phType={buttonsType ? "tacked":"justify"}>
                {
                    this.buttons.map((button,index) => {
                        return <Button hollow key={index} {...button.otherProps} phSize="lg" phStyle={button.phStyle || 'primary'} block={buttonsType}
                            onClick={()=>{
                                if(button.onHandle){
                                    button.onHandle(this.state.inputValue);
                                }else{
                                    onClose();
                                }
                            }}>{button.text || "确定"}</Button>
                    })
                }
            </ButtonGroup>
        );
    }

    render(){
        let {visible, onClose, title, content, closeButton, shadowDisabled} = this.props;

        return (
            <Dialog className={setPhoenixPrefix('dialog-prompt')} visible={visible} onClose={onClose} closeButton={closeButton} shadowDisabled={shadowDisabled}>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Body>
                    {content}
                    {this.renderContent()}
                </Dialog.Body>
                <Dialog.Footer>{this.renderButtons()}</Dialog.Footer>
            </Dialog>
        );
    }
}
