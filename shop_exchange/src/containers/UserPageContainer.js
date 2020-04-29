import React, { Component } from 'react'
import Request from '../helpers/request'
import UserDetails from '../components/UserDetails'
import UserProductIndex from '../components/UserProductIndex'
import AddProductForm from '../components/AddProductForm'

class UserPageContainer extends Component {
    constructor(props) {
      super(props)
      this.state = {
         user: null
      }
      this.updateProducts = this.updateProducts.bind(this);
    }
    
    componentDidMount() {
        const request = new Request()
        request.get(`/api/users/${this.props.match.params.id}`)
        .then((data)=>{
            this.setState({
                user:data
            })
        })
    }

    updateProducts(){
      const request = new Request()
      request.get(`/api/users/${this.props.match.params.id}`)
        .then((data)=>{
            this.setState({
                user:data
            })
        })
    }

    

  render() {

    if (!this.state.user) {
        return <p>Loading....</p>
    }

    return (
      <div className="user-page">
        <UserDetails user={this.state.user}/>
        <div className="user-buttons">
            <button>My Products</button>
            <button>Borrowed Products</button>
        </div>
        <AddProductForm onCreate={this.handleSubmit} userId={this.props.match.params.id} updateProducts={this.updateProducts}/>
        <UserProductIndex products={this.state.user.products}/>
      </div>
    )
  }
}

export default UserPageContainer

