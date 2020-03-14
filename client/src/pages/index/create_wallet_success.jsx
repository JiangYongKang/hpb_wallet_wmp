import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

import './create_wallet_success.less'

import createSuccess from '../../resources/create_success.png'

export default class CreateWalletSuccess extends Component {
    config = {
        disableScroll: true,
        navigationBarTitleText: '创建成功'
    }

    constructor(props) {
        super(props)
        this.state = {
            id: this.$router.params.id
        }
    }

    render() {
        return (
            <View className='container'>
                <Image src={createSuccess} />
                <Text className='text_success'>创建成功，立即备份你的钱包</Text>
                <Text className='text_tips'>
                    备份钱包：导出[助记词]并抄写到安全的地方，千万不要保存到网络上。然后尝试转入、转出小额资产开始使用。
                </Text>
                <Button onClick={() => Taro.navigateTo({ url: `/pages/index/backup_wallet?id=${this.state.id}` })}>
                    立即备份钱包
                </Button>
                <Text className='text_skip'>暂不备份，进入钱包</Text>
            </View>
        )
    }
}
