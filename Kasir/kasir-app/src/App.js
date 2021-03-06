import React, { Component } from 'react';
import { Hasil, ListCategories, NavbarComponent, Menus} from "./components"
import { Row, Col, Container } from 'react-bootstrap'
import { API_URL } from './utils/constants'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       menus : [],
       categoriYangDipilih: 'Makanan'
    }
  }



  componentDidMount () {
    axios
      .get(API_URL+"products?category.nama="+this.state.categoriYangDipilih)
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch (error => {
        console.log(" Error ni yak",error)
      })
  }

  changeCategory = (value) => {
    this.setState ({
      categoriYangDipilih:value,
      menus: []
    })
    axios
      .get(API_URL+"products?category.nama="+value)
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch (error => {
        console.log(" Error ni yak",error)
      })
  }


  render() {
    const {menus, categoriYangDipilih} = this.state
    return (
    <div className="App">
      <NavbarComponent />
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategories changeCategory={this.changeCategory} categoriYangDipilih={categoriYangDipilih}/>
            <Col>
              <h4>
                <strong> Daftar Produk </strong>
              </h4>
              <hr />
              <Row>
                {menus  && menus.map((menu) => (
                  <Menus 
                      key={menu.id}
                      menu={menu}
                  />
                ))}
              </Row>
            </Col>
            <Hasil />
          </Row>
        </Container>
      </div>
    </div>
    )
  }
}


export default App;
