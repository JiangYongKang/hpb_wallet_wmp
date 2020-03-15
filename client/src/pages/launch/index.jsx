import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import './index.less'

import launchIcon from '../../resources/launch_icon.png'

export default class Index extends Component {
    config = {
        disableScroll: true,
        navigationStyle: 'custom'
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        Taro.cloud
            .callFunction({
                name: 'LAUNCH_PAGE'
            })
            .then(res => {
                setTimeout(() => {
                    Taro.reLaunch({ url: res.result.launch })
                }, 3000)
            })
    }

    render() {
        return (
            <View className='container'>
                <Image src={launchIcon} />
                <Text>HPB Wallet</Text>
            </View>
        )
    }
}
