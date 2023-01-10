import { useParams } from 'react-router-dom';

function ProductScreen() {
  // we used a hooks from react-dom called params
  const params = useParams();
  const { slug } = params;
  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
}

export default ProductScreen;
