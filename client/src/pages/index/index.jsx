import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'

import copy from '../../resources/copy.png'
import sacn from '../../resources/scan.png'
import money from '../../resources/money.png'
import trans from '../../resources/trans.png'
import emptyWallet from '../../resources/empty_wallet.png'
import add from '../../resources/add.png'

export default class Index extends Component {
    config = {
        navigationBarTitleText: '资产'
    }

    componentDidMount() {}

    render() {
        return (
            <View className='container'>
                <View className='fund_wrap'>
                    <View className='fund_box'>
                        <Text className='total_funds'>总资产</Text>
                        <Text className='funds_value'>≈￥500.25</Text>
                        <View className='addres_wrap'>
                            <Text>0xe6f0add2d6c4e...297c695527456a</Text>
                            <Image src={copy} />
                        </View>
                    </View>
                </View>
                <View className='actions_wrap'>
                    <View>
                        <Image src={sacn} />
                        <Text>扫一扫</Text>
                    </View>
                    <View>
                        <Image src={money} />
                        <Text>收款</Text>
                    </View>
                    <View>
                        <Image src={trans} />
                        <Text>转账</Text>
                    </View>
                </View>
                <View className='empty_wallet_wrap'>
                    <Image className='none' src={emptyWallet} />
                    <Button className='create' onClick={() => Taro.navigateTo({ url: '/pages/index/create_wallet' })}>
                        <Image src={add} />
                        <Text>现在创建</Text>
                    </Button>
                </View>
            </View>
        )
    }
}
