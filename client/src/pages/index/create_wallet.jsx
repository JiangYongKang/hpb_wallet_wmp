import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Button } from '@tarojs/components'

import './create_wallet.less'

import classNames from 'classnames'

export default class Index extends Component {
    config = {
        navigationBarTitleText: '新建钱包'
    }

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            password: '',
            passwordConfirm: '',
            terms: false,
            success: false
        }
    }

    onChangeColumn = (name, event) => {
        this.setState({ [name]: event.target.value }, () => {
            this.validateColumn()
        })
    }

    onChangeTerms = () => {
        this.setState({ terms: !this.state.terms }, () => {
            this.validateColumn()
        })
    }

    validateColumn = () => {
        let success =
            this.state.name.length > 0 &&
            this.state.password.length > 0 &&
            this.state.passwordConfirm.length > 0 &&
            this.state.password === this.state.passwordConfirm &&
            this.state.terms
        this.setState({ success: success })
    }

    createWallet() {
        Taro.showLoading({ title: '正在创建' })
        if (this.state.name.length === 0) {
            Taro.showToast({ title: '请输入钱包名称', icon: 'none' })
        } else if (this.state.password.length === 0) {
            Taro.showToast({ title: '请输入密码', icon: 'none' })
        } else if (this.state.passwordConfirm.length === 0) {
            Taro.showToast({ title: '请确认密码', icon: 'none' })
        } else if (this.state.password !== this.state.passwordConfirm) {
            Taro.showToast({ title: '两次输入密码不一致', icon: 'none' })
        } else if (!this.state.terms) {
            Taro.showToast({ title: '请确认服务隐私条款', icon: 'none' })
        } else {
            Taro.cloud
                .callFunction({
                    name: 'setKeyStore',
                    data: {
                        name: this.state.name,
                        password: this.state.password
                    }
                })
                .then(res => {
                    Taro.hideLoading()
                    Taro.reLaunch({ url: `/pages/index/create_wallet_success?id=${res.result}` })
                })
        }
    }

    render() {
        return (
            <View className='container'>
                <Input
                    onInput={e => this.onChangeColumn('name', e)}
                    placeholder='给自己的钱包取个名字，如：数字钱包'
                    maxLength={11}
                    focus
                />
                <Input
                    onInput={e => this.onChangeColumn('password', e)}
                    type='password'
                    placeholder='设置密码，保护私钥和交易授权'
                    maxLength={20}
                />
                <Input
                    onInput={e => this.onChangeColumn('passwordConfirm', e)}
                    type='password'
                    placeholder='确认密码'
                    maxLength={20}
                />
                <View className='action_wrap'>
                    <View className='terms_wrap' onClick={() => this.onChangeTerms()}>
                        <View
                            className={classNames({
                                checkbox: true,
                                checked: this.state.terms
                            })}></View>
                        <Text>我已经仔细阅读并同意服务隐私条款</Text>
                    </View>
                    <Button
                        className={classNames({
                            create_btn: true,
                            checked: this.state.success
                        })}
                        onClick={() => this.createWallet()}>
                        创建钱包
                    </Button>
                    <Button className='import_btn'>导入钱包</Button>
                </View>
            </View>
        )
    }
}
