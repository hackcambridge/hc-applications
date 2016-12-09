import React from 'react';
import { connect } from 'react-redux';
import { Container, Col, Progress, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import './application.css';

function Application({ id, firstName, lastName }) {
  return (
    <div>
      <div className="panel-container">
        <Col md="8" className="cv-panel">
          <object data="http://www.cl.cam.ac.uk/teaching/1516/Algorithms/2016-stajano-algs-students-handout.pdf" type="application/pdf"></object>
        </Col>
        <Col md="4" className="details-panel">
          <h6>Learning Goals:</h6>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio dolorum unde voluptas omnis recusandae, facilis optio ipsam aliquid nostrum vel, expedita magni laboriosam, quas assumenda dicta asperiores voluptate, soluta dolore obcaecati amet? Nemo eum in aliquid tempore aspernatur reprehenderit mollitia labore, ea ex, esse sit quo, consequuntur harum iure, repudiandae commodi! Praesentium quidem ut fuga similique quod sit maiores optio, maxime ex labore! Ex minima, accusantium explicabo repellat ipsa. Numquam distinctio accusantium voluptatem cupiditate sapiente temporibus officia cumque pariatur iste aperiam quidem velit delectus dolorum iusto, eaque recusandae saepe vero odio debitis fugiat inventore. Vel voluptates qui optio eius aut.
          </p>

          <h6>Interests:</h6>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam beatae praesentium amet officiis aspernatur sed, ut ullam aut placeat dolorum blanditiis animi neque ad nostrum, nam, excepturi iusto. Eius, autem voluptatem vero facilis, nobis nesciunt possimus impedit enim, aut iusto aperiam quae in sint incidunt optio aspernatur temporibus id quo odit eos. Magni velit, quos, voluptatibus excepturi, quo impedit nisi error fugiat eligendi quas, commodi dolorem enim! Corporis, quod, exercitationem consequuntur cum dolore delectus eum quae, vero dicta recusandae iste.
          </p>

          <h6>Recent Accomplishments:</h6>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit adipisci hic iusto repellendus accusamus magnam earum ducimus fuga a unde officia quaerat velit, sequi ullam quod, rerum exercitationem. Nulla id, fugiat beatae placeat odio veniam perspiciatis ipsa magni quos, distinctio, officia pariatur iste odit. Sequi deserunt placeat iure facilis doloribus culpa aliquid ab esse rerum ex totam tempore dolorem eos hic iusto quasi exercitationem, a officia suscipit voluptas quod cumque deleniti molestiae necessitatibus. Magnam deserunt nemo hic ex consequuntur reiciendis, ab ea quam molestias accusantium modi ut itaque asperiores sapiente?
          </p>


          <h6>Links:</h6>
          <ul>
            <li><a href="http://github.com">github.net</a></li>
            <li><a href="#">linkedout.com.au</a></li>
          </ul>
        </Col>
      </div>
      <footer className="footer">
          <Form inline>

          <Label for="criteria1">Criteria 1:</Label>
          <Input type="select" name="criteria1" id="exampleSelect">
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </Input>
          <Label for="criteria2">Criteria 2:</Label>
          <Input type="select" name="criteria2" id="exampleSelect">
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </Input>
          <Label for="criteria3">Criteria 3:</Label>
          <Input type="select" name="criteria3" id="exampleSelect">
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </Input>
          <Button color="success" className="right">Next</Button>
        </Form>
      </footer>
    </div>
  );
}

function mapStateToProps({ application }) {
  return application;
}

export default connect(mapStateToProps)(Application);
