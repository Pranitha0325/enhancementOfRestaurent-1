import {Component} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Cart from './components/Cart'
import Login from './components/Login'
import CartContext from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import './App.css'

// write your code here
class App extends Component {
  state = {cartList: []}

  addItem = details => {
    this.setState(prevState => ({cartList: [...prevState.cartList, details]}))
  }
  emptyList = () => {
    this.setState({cartList: []})
  }

  removeItem = id => {
    const {cartList} = this.state
    const remaining = cartList.filter(each => each.dish_id !== id)
    this.setState({cartList: remaining})
  }

  increaseQuantity = id => {
    const {cartList} = this.state
    const updatedList = cartList.map(item => {
      if (item.dish_id === id) {
        console.log(item)
        return {...item, count: item.count + 1}
      } else {
        console.log(item)
        return {...item}
      }
    })
    this.setState({cartList: updatedList})
  }

  decreaseQuantity = id => {
    const {cartList} = this.state
    const updatedList = cartList.map(item => {
      if (item.dish_id === id) {
        if (item.count > 0) {
          return {...item, count: item.count - 1}
        }
      } else {
        return {...item}
      }
    })
    this.setState({cartList: updatedList})
  }
  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addItemToCart: this.addItem,
          removeAllItems: this.emptyList,
          deleteCartItem: this.removeItem,
          increaseCartItemQuantity: this.increaseQuantity,
          decreaseCartItemQuantity: this.decreaseQuantity,
        }}
      >
        <BrowserRouter>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App
