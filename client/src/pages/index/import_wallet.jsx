import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Button, Textarea } from '@tarojs/components'

import './import_wallet.less'

import classNames from 'classnames'

export default class ImportWallet extends Component {
    config = {
        navigationBarTitleText: '导入钱包'
    }

    constructor(props) {
        super(props)
        this.state = {
            selectedNav: 'mnemonic',
            mnemonics: '',
            keyStore: '',
            privateKey: '',
            password: '',
            passwordConfirm: '',
            mnemonicsCheckbox: false,
            keyStoreCheckbox: false,
            privateKeyCheckbox: false,
            mnemonicsState: false,
            keyStoreState: false,
            privateKeyState: false
        }
    }

    changeMnemonicsCloumn = (name, event) => {
        this.setState({ [name]: event.target.value }, () => {
            this.setState({
                mnemonicsState:
                    this.state.mnemonics &&
                    this.state.mnemonics.trim().split(' ').length === 12 &&
                    this.state.password.length > 0 &&
                    this.state.password === this.state.passwordConfirm
            })
        })
    }

    changeKeyStoreCloumn = (name, event) => {
        this.setState({ [name]: event.target.value }, () => {
            this.setState({
                keyStoreState:
                    this.state.keyStoreCheckbox &&
                    this.state.keyStore.length > 0 &&
                    this.state.password.length > 0 &&
                    this.state.password === this.state.passwordConfirm
            })
        })
    }

    changePrivateKeyCloumn = (name, event) => {
        this.setState({ [name]: event.target.value }, () => {
            this.setState({
                privateKeyState:
                    this.state.privateKeyCheckbox &&
                    this.state.privateKey.length > 0 &&
                    this.state.password.length > 0 &&
                    this.state.password === this.state.passwordConfirm
            })
        })
    }

    importMnemonics = () => {
        this.checkMnemonics()
    }

    importKeyStore = () => {
        this.checkKeyStore()
    }

    importPrivateKey = () => {
        this.checkKeyStore()
    }

    checkMnemonics = () => {
        if (this.state.mnemonics.trim().split(' ').length !== 12) {
            Taro.showToast({ title: '请输入正确的助记词，以空格隔开', icon: 'none' })
        }
        this.checkPassword()
    }

    checkKeyStore = () => {
        if (this.state.keyStore.length === 0) {
            Taro.showToast({ title: '请粘贴正确的KeyStore文件', icon: 'none' })
        }
        this.checkPassword()
    }

    checkPrivateKey = () => {
        if (this.state.privateKey.length === 0) {
            Taro.showToast({ title: '请粘贴正确的私钥文件', icon: 'none' })
        }
        this.checkPassword()
    }

    checkPassword = () => {
        if (this.state.password.length === 0) {
            Taro.showToast({ title: '请输入密码', icon: 'none' })
        } else if (this.state.password !== this.state.passwordConfirm) {
            Taro.showToast({ title: '两次输入的密码不一致', icon: 'none' })
        }
    }

    render() {
        return (
            <View className='container'>
                <View className='nav_wrap'>
                    <View
                        className={this.state.selectedNav === 'mnemonic' ? 'selected_nav' : ''}
                        onClick={() => this.setState({ selectedNav: 'mnemonic' })}>
                        <Text>助记词</Text>
                    </View>
                    <View
                        className={this.state.selectedNav === 'keyStore' ? 'selected_nav' : ''}
                        onClick={() => this.setState({ selectedNav: 'keyStore' })}>
                        <Text>KeyStore</Text>
                    </View>
                    <View
                        className={this.state.selectedNav === 'privateKey' ? 'selected_nav' : ''}
                        onClick={() => this.setState({ selectedNav: 'privateKey' })}>
                        <Text>私钥</Text>
                    </View>
                </View>

                <View className='form_wrap' style={{ display: this.state.selectedNav === 'mnemonic' ? '' : 'none' }}>
                    <Textarea
                        onInput={e => this.changeMnemonicsCloumn('mnemonics', e)}
                        placeholderClass='textarea_placeholder'
                        placeholder='请输入助记词，按空格分开'
                    />
                    <Input
                        onInput={e => this.changeMnemonicsCloumn('password', e)}
                        type='password'
                        placeholderClass='input_placeholder'
                        placeholder='设置密码，保护私钥和交易授权'
                    />
                    <Input
                        onInput={e => this.changeMnemonicsCloumn('passwordConfirm', e)}
                        type='password'
                        placeholderClass='input_placeholder'
                        placeholder='确认密码'
                    />
                    <View className='terms_wrap'>
                        <View
                            style={this.state.mnemonicsCheckbox ? { backgroundColor: '#2f2d47' } : {}}
                            onClick={() => this.setState({ mnemonicsCheckbox: !this.state.mnemonicsCheckbox })}></View>
                        <Text>我已经仔细阅读并同意服务隐私条款</Text>
                    </View>
                    <Button
                        onClick={this.importMnemonics}
                        style={this.state.mnemonicsState ? { backgroundColor: '#2f2d47', color: 'white' } : {}}>
                        确认
                    </Button>
                </View>

                <View className='form_wrap' style={{ display: this.state.selectedNav === 'keyStore' ? '' : 'none' }}>
                    <Textarea
                        onInput={e => this.changeKeyStoreCloumn('keyStore', e)}
                        placeholderClass='textarea_placeholder'
                        placeholder='请粘贴KeyStore文件'
                    />
                    <Input
                        onInput={e => this.changeKeyStoreCloumn('password', e)}
                        type='password'
                        placeholderClass='input_placeholder'
                        placeholder='输入密码'
                    />
                    <Input
                        onInput={e => this.changeKeyStoreCloumn('passwordConfirm', e)}
                        type='password'
                        placeholderClass='input_placeholder'
                        placeholder='确认密码'
                    />
                    <View className='terms_wrap'>
                        <View
                            style={this.state.keyStoreCheckbox ? { backgroundColor: '#2f2d47' } : {}}
                            onClick={() => this.setState({ keyStoreCheckbox: !this.state.keyStoreCheckbox })}></View>
                        <Text>我已经仔细阅读并同意服务隐私条款</Text>
                    </View>
                    <Button style={this.state.keyStoreState ? { backgroundColor: '#2f2d47', color: 'white' } : {}}>
                        确认
                    </Button>
                </View>

                <View className='form_wrap' style={{ display: this.state.selectedNav === 'privateKey' ? '' : 'none' }}>
                    <Textarea
                        onInput={e => this.changePrivateKeyCloumn('privateKey', e)}
                        placeholderClass='textarea_placeholder'
                        placeholder='请粘贴私钥'
                    />
                    <Input
                        onInput={e => this.changePrivateKeyCloumn('password', e)}
                        type='password'
                        placeholderClass='input_placeholder'
                        placeholder='设置密码，保护私钥和交易授权'
                    />
                    <Input
                        onInput={e => this.changePrivateKeyCloumn('passwordConfirm', e)}
                        type='password'
                        placeholderClass='input_placeholder'
                        placeholder='确认密码'
                    />
                    <View className='terms_wrap'>
                        <View
                            style={this.state.privateKeyCheckbox ? { backgroundColor: '#2f2d47' } : {}}
                            onClick={() =>
                                this.setState({ privateKeyCheckbox: !this.state.privateKeyCheckbox })
                            }></View>
                        <Text>我已经仔细阅读并同意服务隐私条款</Text>
                    </View>
                    <Button style={this.state.privateKeyState ? { backgroundColor: '#2f2d47', color: 'white' } : {}}>
                        确认
                    </Button>
                </View>
            </View>
        )
    }
}
