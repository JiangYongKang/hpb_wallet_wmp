import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

import './confirm_mnemonic.less'

export default class ConfirmMnemonic extends Component {
    config = {
        disableScroll: true,
        navigationBarTitleText: '确认助记词'
    }

    constructor(props) {
        super(props)
        this.state = {
            id: this.$router.params.id,
            mnemonics: []
        }
    }

    componentDidMount() {
        Taro.cloud
            .callFunction({
                name: 'findKeyStoreById',
                data: { id: this.state.id }
            })
            .then(res => {
                let mnemonics = res.result.mnemonic.split(' ')
                this.setState({ mnemonics: mnemonics.sort(() => 0.5 - Math.random()) })
            })
    }

    render() {
        return (
            <View className='container'>
                <Text className='title'>确认你的钱包助记词</Text>
                <Text className='tips'>请按顺序点击助记词，以确认你的备份助记词正确。</Text>
                <View className='mnemonics_wrap wrap_one'></View>
                <View className='mnemonics_wrap wrap_two'>
                    {this.state.mnemonics.map(mnemonic => (
                        <View key={mnemonic}>
                            <Text>{mnemonic}</Text>
                        </View>
                    ))}
                </View>
                <Button onClick={() => Taro.switchTab({ url: '/pages/index/index' })}>确认</Button>
            </View>
        )
    }
}
