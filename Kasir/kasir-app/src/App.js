import React from 'react'
import { Hasil, ListCategories, NavbarComponent} from "./components"
import { Row, Col, Container } from 'react-bootstrap'

function App() {
  return (
    <div className="App">
      
        <NavbarComponent />
        <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCategories />
              <Col>
                <h4><strong> Daftar Produk </strong></h4>
                <hr />
              </Col>
              <Hasil />
            </Row>
          </Container>
        </div>
    </div>
  );
}

export default App;
