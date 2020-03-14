import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Button, Textarea } from '@tarojs/components'

import './import_wallet.less'

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

    changeMnemonicsCloumn = (name, value) => {
        this.setState({ [name]: value }, () => {
            this.setState({
                mnemonicsState:
                    this.state.mnemonics &&
                    this.state.mnemonics.trim().split(' ').length === 12 &&
                    this.state.password.length > 0 &&
                    this.state.password === this.state.passwordConfirm
            })
        })
    }

    changeKeyStoreCloumn = (name, value) => {
        this.setState({ [name]: value }, () => {
            this.setState({
                keyStoreState:
                    this.state.keyStoreCheckbox &&
                    this.state.keyStore.length > 0 &&
                    this.state.password.length > 0 &&
                    this.state.password === this.state.passwordConfirm
            })
        })
    }

    changePrivateKeyCloumn = (name, value) => {
        this.setState({ [name]: value }, () => {
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
        if (this.state.mnemonics.trim().split(' ').length !== 12) {
            Taro.showToast({ title: '请输入正确的助记词，以空格隔开', icon: 'none' })
        } else if (this.state.password.length === 0) {
            Taro.showToast({ title: '请输入密码', icon: 'none' })
        } else if (this.state.password !== this.state.passwordConfirm) {
            Taro.showToast({ title: '两次输入的密码不一致', icon: 'none' })
        } else {
            Taro.showLoading({ title: '正在导入...' })
            Taro.cloud
                .callFunction({
                    name: 'IMPORT_WALLET_WITH_MNEMONICS',
                    data: {
                        mnemonics: this.state.mnemonics,
                        password: this.state.password
                    }
                })
                .then(res => {
                    Taro.hideLoading()
                    Taro.showToast({ title: '导入成功', icon: 'none' })
                    Taro.switchTab({ url: '/pages/index/index' })
                })
        }
    }

    importKeyStore = () => {
        if (this.state.keyStore.length === 0) {
            Taro.showToast({ title: '请粘贴正确的KeyStore文件', icon: 'none' })
        } else if (this.state.password.length === 0) {
            Taro.showToast({ title: '请输入密码', icon: 'none' })
        } else if (this.state.password !== this.state.passwordConfirm) {
            Taro.showToast({ title: '两次输入的密码不一致', icon: 'none' })
        } else {
            Taro.showLoading({ title: '正在导入...' })
            Taro.cloud
                .callFunction({
                    name: 'IMPORT_WALLET_WITH_KEY_STORE',
                    data: {
                        keyStore: this.state.keyStore,
                        password: this.state.password
                    }
                })
                .then(res => {
                    // TODO: hide loading with switch tab
                    Taro.hideLoading()
                    Taro.showToast({ title: '导入成功', icon: 'none' })
                    Taro.switchTab({ url: '/pages/index/index' })
                })
        }
    }

    importPrivateKey = () => {
        if (this.state.privateKey.length !== 66) {
            Taro.showToast({ title: '请粘贴正确的私钥文件', icon: 'none' })
        } else if (this.state.password.length === 0) {
            Taro.showToast({ title: '请输入密码', icon: 'none' })
        } else if (this.state.password !== this.state.passwordConfirm) {
            Taro.showToast({ title: '两次输入的密码不一致', icon: 'none' })
        } else {
            Taro.showLoading({ title: '正在导入...' })
            Taro.cloud
                .callFunction({
                    name: 'IMPORT_WALLET_WITH_PRIVATE_KEY',
                    data: {
                        privateKey: this.state.privateKey,
                        password: this.state.password
                    }
                })
                .then(res => {
                    Taro.hideLoading()
                    Taro.showToast({ title: '导入成功', icon: 'none' })
                    Taro.switchTab({ url: '/pages/index/index' })
                })
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
                        onInput={e => this.changeMnemonicsCloumn('mnemonics', e.target.value)}
                        placeholderClass='textarea_placeholder'
                        placeholder='请输入助记词，按空格分开'
                    />
                    <Input
                        onInput={e => this.changeMnemonicsCloumn('password', e.target.value)}
                        type='password'
                        placeholderClass='input_placeholder'
                        placeholder='设置密码，保护私钥和交易授权'
                    />
                    <Input
                        onInput={e => this.changeMnemonicsCloumn('passwordConfirm', e.target.value)}
                        type='password'
                        placeholderClass='input_placeholder'
                        placeholder='确认密码'
                    />
                    <View className='terms_wrap'>
                        <View
                            style={this.state.mnemonicsCheckbox ? { backgroundColor: '#2f2d47' } : {}}
                            onClick={() =>
                                this.changeMnemonicsCloumn('mnemonicsCheckbox', !this.state.mnemonicsCheckbox)
                            }></View>
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
                        onInput={e => this.changeKeyStoreCloumn('keyStore', e.target.value)}
                        placeholderClass='textarea_placeholder'
                        placeholder='请粘贴KeyStore文件'
                    />
                    <Input
                        onInput={e => this.changeKeyStoreCloumn('password', e.target.value)}
                        type='password'
                        placeholderClass='input_placeholder'
                        placeholder='输入密码'
                    />
                    <Input
                        onInput={e => this.changeKeyStoreCloumn('passwordConfirm', e.target.value)}
                        type='password'
                        placeholderClass='input_placeholder'
                        placeholder='确认密码'
                    />
                    <View className='terms_wrap'>
                        <View
                            style={this.state.keyStoreCheckbox ? { backgroundColor: '#2f2d47' } : {}}
                            onClick={() =>
                                this.changeKeyStoreCloumn('keyStoreCheckbox', !this.state.keyStoreCheckbox)
                            }></View>
                        <Text>我已经仔细阅读并同意服务隐私条款</Text>
                    </View>
                    <Button
                        style={this.state.keyStoreState ? { backgroundColor: '#2f2d47', color: 'white' } : {}}
                        onClick={this.importKeyStore}>
                        确认
                    </Button>
                </View>

                <View className='form_wrap' style={{ display: this.state.selectedNav === 'privateKey' ? '' : 'none' }}>
                    <Textarea
                        onInput={e => this.changePrivateKeyCloumn('privateKey', e.target.value)}
                        placeholderClass='textarea_placeholder'
                        placeholder='请粘贴私钥'
                    />
                    <Input
                        onInput={e => this.changePrivateKeyCloumn('password', e.target.value)}
                        type='password'
                        placeholderClass='input_placeholder'
                        placeholder='设置密码，保护私钥和交易授权'
                    />
                    <Input
                        onInput={e => this.changePrivateKeyCloumn('passwordConfirm', e.target.value)}
                        type='password'
                        placeholderClass='input_placeholder'
                        placeholder='确认密码'
                    />
                    <View className='terms_wrap'>
                        <View
                            style={this.state.privateKeyCheckbox ? { backgroundColor: '#2f2d47' } : {}}
                            onClick={() =>
                                this.changePrivateKeyCloumn('privateKeyCheckbox', !this.state.privateKeyCheckbox)
                            }></View>
                        <Text>我已经仔细阅读并同意服务隐私条款</Text>
                    </View>
                    <Button
                        style={this.state.privateKeyState ? { backgroundColor: '#2f2d47', color: 'white' } : {}}
                        onClick={this.importPrivateKey}>
                        确认
                    </Button>
                </View>
            </View>
        )
    }
}
