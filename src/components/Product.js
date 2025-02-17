import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { getProducts } from "../store/productSlice";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";
import StatusCode from "../utils/StatusCode";

const Product = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.products);
  const {LOADING, ERROR} = StatusCode

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  if (status === LOADING) {
    return <p>Loading...</p>;
  }

  if (status === ERROR){
    return <Alert key="danger" variant="danger">Something went wrong!</Alert>
  }
  const addToCart = (product) => {
    dispatch(add(product));
  };

  const cards = products.map((product) => (
    <div className="col-md-3" style={{ marginBottom: "10px" }}>
      <Card key={product.id} className="h-100">
        <div className="text-center">
          <Card.Img
            variant="top"
            src={product.image}
            style={{ width: "100px", height: "130px" }}
          />
        </div>
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>INR: {product.price}</Card.Text>
        </Card.Body>
        <Card.Footer style={{ backgroundColor: "white" }}>
          <Button variant="primary" onClick={() => addToCart(product)}>
            Add to Cart
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ));

  return (
    <>
      <h1>Product Dashboard</h1>
      <div className="row">{cards}</div>
    </>
  );
};

export default Product;
