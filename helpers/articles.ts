import { web3 } from '../helpers/web'

const ARTICLES = {
    'the_exiles': {
      title: 'The Exiles',
      description: 'Ray Bradbury: The Exiles',
      price: '1000000',
      priceHuman: 'for ' + web3.fromWei('1000000', 'kwei') + 'kWei',
      url: 'https://vynos.tech/articles/the_exiles',
      image: '/images/the_exiles.jpeg'
    },
    'the_pedestrian': {
      title: 'The pedestrian',
      description: 'Ray Bradbury: The Pedestrian',
      price: '2000000',
      priceHuman: 'for ' + web3.fromWei('2000000', 'kwei') + 'kWei',    
      url: 'https://vynos.tech/articles/the_pedestrian',
      image: '/images/the_pedestrian.jpeg'
    },
    'the_veldt': {
      title: 'The veldt',
      description: 'Ray Bradbury: The Veldt',
      price: '3000000',
      priceHuman: 'for ' + web3.fromWei('3000000', 'kwei') + 'kWei',    
      url: 'https://vynos.tech/articles/the_veldt',
      image: '/images/tigers.png'
    },
    'there_will_come_soft_rains': {
      title: 'There Will Come Soft Rains',
      description: 'Ray Bradbury: There Will Come Soft Rains',
      price: '4000000',
      priceHuman: 'for ' + web3.fromWei('4000000', 'kwei') + 'kWei',    
      url: 'https://vynos.tech/articles/there_will_come_soft_rains',
      image: '/images/rains.jpeg'
    }
  }

  export default ARTICLES