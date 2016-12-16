//Steps-
//first,stick the data you're getting into a variable
//next, map over that object to get the id numbers out?
//concat those ids into an axios request to get the items with those ids
//put those things into inventory

{/*
constructor(props) {
  super(props);
  this.state={
    inventory: [],
    myCart: api()+'/api/cart',
    productsCall: api()+'/api/products',
}
}

componentDidMount () {
  axios.get(this.state.myCart)
  .then((response) => {
    var cart = (Object.assign({}, response.data))
    console.log(response.data)
    return cart
  })
  .catch((error) => {
    alert(error);
    console.log(error);
  });
}

let muhCars = cart.map(carID) => {
  axios.get(this.state.productsCall+carID)
}

this.setState({
  inventory: muhCars
})

(Object.assign({}, response.data))

var confirmed = confirm("Do you want to remove this from your cart?")
if (confirmed === true){
  console.log(api()+'api/cart/'+id)
  axios.delete(api()+'api/cart/'+id)
  .then((response) => {
    axios.get(this.state.myCart).then((response) => {
      let newInventory = response.data.slice(0);
      this.setState({
        inventory: newInventory
      })

      getSubtotal() {
        let subtotal = this.state.inventory.map((item) => {
          return item.price
        })
        .reduce(function(a, b){
          return a + b
        }, 0)
        this.setState({
          subtotal: subtotal
        })
        console.log(this.state.subtotal)
      }

      if (this.state.showToggleOnZip == true) {
        this.getTaxInfo();
      }

*/}
