import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

import './backup_wallet.less'

export default class BackupWallet extends Component {
    config = {
        disableScroll: true,
        navigationBarTitleText: '备份助记词'
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
                this.setState({ mnemonics: res.result.mnemonic.split(' ') })
            })
    }

    render() {
        return (
            <View className='container'>
                <Text className='title'>抄写你的钱包助记词</Text>
                <Text className='tips'>
                    助记词用于恢复钱包或重置钱包密码，将它准确的抄写到纸上，并存放在只有你知道的安全地方。
                </Text>
                <View className='mnemonics_wrap'>
                    {this.state.mnemonics.map(mnemonic => (
                        <View key={mnemonic}>
                            <Text>{mnemonic}</Text>
                        </View>
                    ))}
                </View>
                <Button onClick={() => Taro.navigateTo({ url: `/pages/index/confirm_mnemonic?id=${this.state.id}` })}>
                    下一步
                </Button>
            </View>
        )
    }
}
