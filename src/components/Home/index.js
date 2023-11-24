import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import CartContext from '../../context/CartContext'
import './index.css'

class Home extends Component {
  state = {
    count: 0,
    restaurentDetails: [],
    category: [],
    dishes: [],
    cartList: [],
  }
  componentDidMount() {
    this.getData()
  }

  successView = data => {
    const listItems = data.table_menu_list
    this.setState({
      restaurentDetails: data,
      category: listItems,
      dishes: listItems[0].category_dishes,
    })
  }

  getData = async () => {
    const response = await fetch(
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc',
    )
    const data = await response.json()
    if (response.ok) {
      this.successView(data[0])
    } else {
      this.failureView()
    }
  }

  onSelectCategory = id => {
    const {category} = this.state
    for (let i in category) {
      const selectedId = category[i].menu_category_id
      if (selectedId === id) {
        this.setState({dishes: category[i].category_dishes})
      }
    }
  }

  onDecrease = () => {
    this.setState(prevState => ({count: prevState.count - 1}))
  }

  onIncrease = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }

  renderDetails = () => (
    <CartContext.Consumer>
      {value => {
        const {restaurentDetails, category, dishes, count} = this.state
        const {cartList, addItemToCart} = value

        const addToCart = each => {
          addItemToCart({...each, count})
        }
        return (
          <div>
            <div className="header">
              <h1>{restaurentDetails.restaurant_name}</h1>
              <p>My Orders</p>
              <Link to="/cart">
                <AiOutlineShoppingCart className="cart_logo" />
              </Link>
              <p>{cartList.length}</p>
            </div>
            <div className="list">
              <ul className="categories_list">
                {category.map(each => (
                  <li key={each.menu_category_id}>
                    <button
                      type="button"
                      onClick={() =>
                        this.onSelectCategory(each.menu_category_id)
                      }
                    >
                      {each.menu_category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ul>
                {dishes.map(each => (
                  <li key={each.dish_id}>
                    <div className="dishes">
                      <div>
                        {each.addonCat.length !== 0 && (
                          <p>Customization Available</p>
                        )}
                        <p>{each.dish_name}</p>
                        <p>
                          {each.dish_currency} {each.dish_price}
                        </p>
                        <p>{each.dish_description}</p>
                        <p>{each.dish_calories} calories</p>
                        {each.dish_Availability ? (
                          <div className="add-item">
                            <button onClick={this.onDecrease}>-</button>
                            <p>{count}</p>
                            <button onClick={this.onIncrease}>+</button>
                          </div>
                        ) : (
                          <p>Not Available</p>
                        )}
                        {each.addonCat.length !== 0 && (
                          <p>Customizations available</p>
                        )}
                        {count > 0 && (
                          <button type="button" onClick={() => addToCart(each)}>
                            Add to Cart
                          </button>
                        )}
                      </div>
                      <img
                        className="dish-image"
                        src={each.dish_image}
                        alt={each.dish_id}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    return <div>{this.renderDetails()}</div>
  }
}
export default Home
