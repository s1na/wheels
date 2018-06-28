import { observable, action } from 'mobx'

class Store {
  @observable greetings = 'hello world';

  @action
  createOffer (hash) {
    console.log('hello world', hash)
  }
}

export default Store
